'use client';

import { useCallback, useEffect, useState } from 'react';
import { Brain, Sparkles } from 'lucide-react';

type AnaliseIA = {
  pet: string;
  nivel: 'BAIXO' | 'MODERADO' | 'ALTO' | 'CRITICO';
  pontuacao: number;
  justificativa: string;
  recomendacao: string;
  fatores: string[];
  analisadoEm: string;
  modelo: string;
};

type IotData = {
  temperatura: number;
  umidade: number;
  presenca: boolean;
};

export function AIAnalysis() {
  const [analise, setAnalise] = useState<AnaliseIA | null>(null);
  const [carregando, setCarregando] = useState(true);

  const analisar = useCallback(async () => {
    try {
      const iotResponse = await fetch('/api/iot', {
        cache: 'no-store',
      });

      if (!iotResponse.ok) {
        throw new Error('Erro ao buscar sensores');
      }

      const iotData: IotData = await iotResponse.json();

      const iaResponse = await fetch('/api/ia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          temperatura: iotData.temperatura,
          umidade: iotData.umidade,
          presenca: iotData.presenca,
          pet: {
            nome: 'Thor',
            especie: 'Cachorro',
            raca: 'Bulldog Francês',
            idade: 8,
            peso: 13,
          },
        }),
      });

      if (!iaResponse.ok) {
        throw new Error('Erro ao executar análise inteligente');
      }

      const resultado: AnaliseIA = await iaResponse.json();

      setAnalise(resultado);
    } catch (error) {
      console.error('Erro na análise IA:', error);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    analisar();

    const interval = setInterval(() => {
      analisar();
    }, 3000);

    return () => clearInterval(interval);
  }, [analisar]);

  const corNivel = {
    BAIXO: '#16a34a',
    MODERADO: '#ca8a04',
    ALTO: '#ea580c',
    CRITICO: '#dc2626',
  };

  if (carregando) {
    return (
      <article className="panel">
        <p>Analisando ambiente com CareSense AI...</p>
      </article>
    );
  }

  if (!analise) {
    return (
      <article className="panel">
        <p>Não foi possível realizar a análise inteligente.</p>
      </article>
    );
  }

  return (
    <article
      className="panel"
      style={{
        marginTop: 24,
        padding: 24,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 22,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#eef6ff',
              color: '#0A7BFF',
            }}
          >
            <Brain size={24} />
          </div>

          <div>
            <span
              style={{
                fontSize: 12,
                color: '#8A94A6',
                fontWeight: 600,
              }}
            >
              INTELIGÊNCIA ARTIFICIAL
            </span>

            <h2
              style={{
                margin: '3px 0 0',
              }}
            >
              CareSense AI
            </h2>
          </div>
        </div>

        <Sparkles size={22} color="#0A7BFF" />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          padding: '16px 18px',
          background: '#f8fafc',
          borderRadius: 14,
          marginBottom: 20,
        }}
      >
        <div>
          <span
            style={{
              display: 'block',
              color: '#8A94A6',
              fontSize: 13,
              marginBottom: 4,
            }}
          >
            Pet analisado
          </span>

          <strong>{analise.pet}</strong>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span
            style={{
              display: 'block',
              color: '#8A94A6',
              fontSize: 13,
              marginBottom: 4,
            }}
          >
            Risco inteligente
          </span>

          <strong
            style={{
              color: corNivel[analise.nivel],
              fontSize: 18,
            }}
          >
            {analise.nivel}
          </strong>
        </div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <strong
          style={{
            display: 'block',
            marginBottom: 7,
          }}
        >
          Análise
        </strong>

        <p
          style={{
            margin: 0,
            lineHeight: 1.6,
            color: '#586174',
          }}
        >
          {analise.justificativa}
        </p>
      </div>

      <div
        style={{
          padding: 16,
          borderRadius: 12,
          borderLeft: `4px solid ${corNivel[analise.nivel]}`,
          background: '#f8fafc',
        }}
      >
        <strong
          style={{
            display: 'block',
            marginBottom: 7,
          }}
        >
          Recomendação inteligente
        </strong>

        <p
          style={{
            margin: 0,
            lineHeight: 1.6,
            color: '#586174',
          }}
        >
          {analise.recomendacao}
        </p>
      </div>

      <div
        style={{
          marginTop: 18,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 10,
          fontSize: 12,
          color: '#8A94A6',
        }}
      >
        <span>{analise.modelo}</span>
        <span>Pontuação: {analise.pontuacao}</span>
      </div>
    </article>
  );
}
