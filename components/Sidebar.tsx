'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  AlertTriangle,
  Dog,
  HomeIcon,
  LayoutDashboard,
  Thermometer,
  Wifi,
} from 'lucide-react';

type SidebarProps = {
  active: 'dashboard' | 'sensores' | 'alertas' | 'pets' | 'ambientes';
};

export function Sidebar({ active }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div>
        <div className="brand">
          <Image
            src="/assets/logo-icon-blue.svg"
            alt="VitalPet"
            width={60}
            height={60}
            className="sidebarLogo"
          />
          <span>CareSense IoT</span>
        </div>

        <nav className="menu">
          <Link href="/" className={active === 'dashboard' ? 'active' : ''}>
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link href="/sensores" className={active === 'sensores' ? 'active' : ''}>
            <Thermometer size={18} />
            Sensores
          </Link>

          <Link href="/alertas" className={active === 'alertas' ? 'active' : ''}>
            <AlertTriangle size={18} />
            Alertas
          </Link>

          <Link href="/pets" className={active === 'pets' ? 'active' : ''}>
            <Dog size={18} />
            Pets
          </Link>

          <Link href="/ambientes" className={active === 'ambientes' ? 'active' : ''}>
            <HomeIcon size={18} />
            Ambientes
          </Link>
        </nav>
      </div>

      <div className="deviceCard">
        <Wifi size={22} />
        <div>
          <span>ESP32 Online</span>
          <strong>vitalpet-esp32-001</strong>
        </div>
      </div>
    </aside>
  );
}