import { Activity, Droplets, Thermometer, Wifi } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';

export default function SensoresPage() {
  return (
    <main className="dashboard">
      <Sidebar active="sensores" />

      <section className="content">
        <div className="simplePageContent">
          <h1>Sensores IoT</h1>
          <p>Dispositivos conectados ao ESP32 para monitoramento do ambiente.</p>

          <section className="simpleGrid">
            <article className="simpleCard">
              <Thermometer />
              <h2>DHT22</h2>
              <p>Temperatura: 34.1°C</p>
              <span>Online</span>
            </article>

            <article className="simpleCard">
              <Droplets />
              <h2>DHT22</h2>
              <p>Umidade: 33%</p>
              <span>Online</span>
            </article>

            <article className="simpleCard">
              <Activity />
              <h2>PIR</h2>
              <p>Movimento detectado</p>
              <span>Ativo</span>
            </article>

            <article className="simpleCard">
              <Wifi />
              <h2>ESP32</h2>
              <p>vitalpet-esp32-001</p>
              <span>Conectado</span>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
}