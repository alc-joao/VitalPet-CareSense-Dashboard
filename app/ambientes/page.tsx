import { HomeIcon, Thermometer, Wifi } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';

export default function AmbientesPage() {
  return (
    <main className="dashboard">
      <Sidebar active="ambientes" />

      <section className="content">
        <div className="simplePageContent">
          <h1>Ambientes</h1>
          <p>Locais monitorados pelo sistema IoT.</p>

          <section className="simpleGrid">
            <article className="simpleCard">
              <HomeIcon />
              <h2>Sala Tutor</h2>
              <p>Ambiente principal de monitoramento.</p>
              <span>Ativo</span>
            </article>

            <article className="simpleCard">
              <Thermometer />
              <h2>Área Interna</h2>
              <p>Controle de temperatura e umidade.</p>
              <span>Seguro</span>
            </article>

            <article className="simpleCard">
              <Wifi />
              <h2>Dispositivo</h2>
              <p>ESP32 conectado via simulação.</p>
              <span>Online</span>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
}