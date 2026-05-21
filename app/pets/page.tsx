import { Dog } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';

export default function PetsPage() {
  return (
    <main className="dashboard">
      <Sidebar active="pets" />

      <section className="content">
        <div className="simplePageContent">
          <h1>Pets Monitorados</h1>
          <p>Animais cadastrados no sistema VitalPet CareSense.</p>

          <section className="simpleGrid">
            <article className="simpleCard">
              <Dog />
              <h2>Thor</h2>
              <p>Cachorro • Porte médio</p>
              <span>Monitorado</span>
            </article>

            <article className="simpleCard">
              <Dog />
              <h2>Mel</h2>
              <p>Cachorra • Porte pequeno</p>
              <span>Monitorado</span>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
}