import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';

export default function AlertasPage() {
  return (
    <main className="dashboard">
      <Sidebar active="alertas" />

      <section className="content">
        <div className="simplePageContent">
          <h1>Alertas</h1>
          <p>Histórico de eventos críticos detectados pelo sistema.</p>

          <section className="simpleList">
            <article>
              <AlertTriangle />
              <div>
                <h2>Temperatura crítica</h2>
                <p>Pet detectado em ambiente acima de 33°C.</p>
              </div>
              <span>Crítico</span>
            </article>

            <article>
              <ShieldAlert />
              <div>
                <h2>Baixa umidade</h2>
                <p>Umidade abaixo do ideal para o ambiente.</p>
              </div>
              <span>Atenção</span>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
}