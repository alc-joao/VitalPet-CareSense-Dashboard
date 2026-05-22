'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import {
  AlertTriangle,
  Bell,
  Dog,
  Droplets,
  ShieldCheck,
  Thermometer,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Sidebar } from '@/components/Sidebar';

type Status = 'SEGURO' | 'ATENCAO' | 'CRITICO';

type ApiData = {
  temperatura: number;
  umidade: number;
  presenca: boolean;
  atualizadoEm: string;
};

type SensorData = ApiData & {
  status: Status;
  risco: number;
  mensagem: string;
};

const getStatus = (data: ApiData): SensorData => {
  const { temperatura, umidade, presenca } = data;

  if (temperatura >= 33 && presenca) {
    return {
      ...data,
      status: 'CRITICO',
      risco: 2,
      mensagem: 'Pet detectado em ambiente crítico. Ação recomendada.',
    };
  }

  if (temperatura >= 30 || umidade < 35) {
    return {
      ...data,
      status: 'ATENCAO',
      risco: 1,
      mensagem: 'Ambiente exige atenção. Verifique temperatura ou umidade.',
    };
  }

  return {
    ...data,
    status: 'SEGURO',
    risco: 0,
    mensagem: 'Ambiente seguro para o pet.',
  };
};

const initialData = getStatus({
  temperatura: 25,
  umidade: 60,
  presenca: false,
  atualizadoEm: new Date().toISOString(),
});

export default function DashboardPage() {
  const [data, setData] = useState<SensorData>(initialData);
  const [ultimaLeitura, setUltimaLeitura] = useState('--:--:--');

  const [history, setHistory] = useState([
    { hora: '13:50:01', temperatura: 24 },
    { hora: '13:50:05', temperatura: 25 },
    { hora: '13:50:09', temperatura: 26 },
    { hora: '13:50:13', temperatura: 27 },
    { hora: '13:50:17', temperatura: 29 },
    { hora: '13:50:21', temperatura: 31 },
  ]);

  const atualizarTela = useCallback((apiData: Partial<ApiData>) => {
    const safeData: ApiData = {
      temperatura: Number(apiData?.temperatura ?? 25),
      umidade: Number(apiData?.umidade ?? 60),
      presenca: Boolean(apiData?.presenca ?? false),
      atualizadoEm: apiData?.atualizadoEm ?? new Date().toISOString(),
    };

    const next = getStatus(safeData);

    setData(next);

    setUltimaLeitura(
      new Date(next.atualizadoEm).toLocaleTimeString('pt-BR')
    );

    const agora = new Date();

    setHistory((old) => {
      const segundos = String(agora.getSeconds()).padStart(2, '0');

      return [
        ...old.slice(-7),
        {
          hora: `${agora.getHours()}:${String(agora.getMinutes()).padStart(
            2,
            '0'
          )}:${segundos}`,
          temperatura: Number((next.temperatura ?? 0).toFixed(1)),
        },
      ];
    });
  }, []);

  const carregarDadosIoT = useCallback(async () => {
    try {
      const response = await fetch('/api/iot', {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar dados da API IoT');
      }

      const apiData: Partial<ApiData> = await response.json();

      atualizarTela(apiData);
    } catch (error) {
      console.error('Erro ao carregar IoT:', error);

      atualizarTela({
        temperatura: 25,
        umidade: 60,
        presenca: false,
        atualizadoEm: new Date().toISOString(),
      });
    }
  }, [atualizarTela]);

  const simularLeituraIoT = async () => {
    try {
      const temperatura = Number((24 + Math.random() * 12).toFixed(1));
      const umidade = Math.floor(30 + Math.random() * 45);
      const presenca = Math.random() > 0.45;

      const response = await fetch('/api/iot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          temperatura,
          umidade,
          presenca,
          atualizadoEm: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao simular dados IoT');
      }

      const apiData: Partial<ApiData> = await response.json();

      atualizarTela({
        temperatura: apiData.temperatura ?? temperatura,
        umidade: apiData.umidade ?? umidade,
        presenca: apiData.presenca ?? presenca,
        atualizadoEm: apiData.atualizadoEm ?? new Date().toISOString(),
      });
    } catch (error) {
      console.error('Erro ao simular IoT:', error);
    }
  };

  useEffect(() => {
    carregarDadosIoT();

    const interval = setInterval(() => {
      carregarDadosIoT();
    }, 3000);

    return () => clearInterval(interval);
  }, [carregarDadosIoT]);

  const statusClass = data.status.toLowerCase();

  return (
    <main className="dashboard">
      <Sidebar active="dashboard" />

      <section className="content">
        <header className="topbar">
          <div>
            <span className="pageLabel">Dashboard IoT</span>

            <h1>Monitoramento Inteligente Pet</h1>

            <p>
              Painel online integrado com ESP32/Wokwi para acompanhar
              temperatura, umidade, presença e nível de risco do ambiente.
            </p>
          </div>

          <div className="topActions">
            <button className="iconButton" type="button" aria-label="Notificações">
              <Bell size={20} />
            </button>

            <div className="profile">
              <Image
                src="/assets/logo-icon-blue.svg"
                alt="VitalPet"
                width={38}
                height={38}
              />

              <div>
                <strong>VitalPet</strong>
                <span>Administrador</span>
              </div>
            </div>
          </div>
        </header>

        <section className="cards">
          <article className="card">
            <div className="cardIcon blue">
              <Thermometer size={24} />
            </div>

            <span>Temperatura</span>
            <strong>{data.temperatura}°C</strong>
            <small>Sensor DHT22</small>
          </article>

          <article className="card">
            <div className="cardIcon cyan">
              <Droplets size={24} />
            </div>

            <span>Umidade</span>
            <strong>{data.umidade}%</strong>
            <small>Condição do ambiente</small>
          </article>

          <article className="card">
            <div className="cardIcon green">
              <Dog size={24} />
            </div>

            <span>Presença</span>
            <strong>{data.presenca ? 'Detectada' : 'Não detectada'}</strong>
            <small>Sensor PIR</small>
          </article>

          <article className={`card statusCard ${statusClass}`}>
            <div className="cardIcon red">
              <ShieldCheck size={24} />
            </div>

            <span>Status</span>
            <strong>{data.status}</strong>
            <small>Nível de risco {data.risco}</small>
          </article>
        </section>

        <section className="mainGrid">
          <article className="panel chartPanel">
            <div className="panelHeader">
              <div>
                <span>Leituras em tempo real</span>
                <h2>Temperatura do ambiente</h2>
              </div>

              <button type="button" onClick={simularLeituraIoT}>
                Simular ESP32
              </button>
            </div>

            <div className="chartWrapper">
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={history}>
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0A7BFF" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#0A7BFF" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#E5EAF3" />

                  <XAxis
                    dataKey="hora"
                    tick={{ fill: '#8A94A6', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{ fill: '#8A94A6', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="temperatura"
                    stroke="#0A7BFF"
                    strokeWidth={4}
                    fill="url(#tempGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>

          <aside className="rightColumn">
            <article className={`alertBox ${statusClass}`}>
              <AlertTriangle size={28} />

              <div>
                <span>Status do ambiente</span>
                <strong>{data.status}</strong>
                <p>{data.mensagem}</p>
              </div>
            </article>

            <article className="panel riskPanel">
              <div className="panelHeader">
                <div>
                  <span>Nível de risco</span>
                  <h2>Diagnóstico</h2>
                </div>
              </div>

              <div className={`riskCircle ${statusClass}`}>
                <strong>{data.risco}</strong>
              </div>
            </article>

            <article className="panel systemPanel">
              <div className="panelHeader">
                <div>
                  <span>Sistema</span>
                  <h2>Conexões</h2>
                </div>
              </div>

              <div className="systemList">
                <div>
                  <span>ESP32</span>
                  <strong>Online</strong>
                </div>

                <div>
                  <span>Wokwi</span>
                  <strong>Simulando</strong>
                </div>

                <div>
                  <span>Protocolo</span>
                  <strong>HTTP</strong>
                </div>

                <div>
                  <span>Última leitura</span>
                  <strong>{ultimaLeitura}</strong>
                </div>
              </div>
            </article>
          </aside>
        </section>
      </section>
    </main>
  );
}