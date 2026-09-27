"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

type AppShellProps = {
  breadcrumb: string;
  title: string;
  status: string;
  children: ReactNode;
};

const monitoringLinks = [
  { href: "/dashboard", icon: "▣", label: "DASHBOARD" },
  { href: "/readings", icon: "◉", label: "READINGS" },
  { href: "/notifications", icon: "⚠", label: "NOTIFICATIONS" },
] as const;

export default function AppShell({
  breadcrumb,
  title,
  status,
  children,
}: AppShellProps) {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState("00:00:00");

  useEffect(() => {
    const updateClock = () => {
      setCurrentTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hourCycle: "h23",
        }).format(new Date()),
      );
    };

    updateClock();
    const intervalId = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="app">
      <aside className="sidebar">
        <Link href="/dashboard" className="sidebar-brand">
          <span className="brand-mark small">
            <Image
              src="/assets/logo.svg"
              alt="FumeTrix air quality mark"
              width={40}
              height={40}
              priority
            />
          </span>
          <span className="brand-name">
            <strong>FumeTrix</strong>
            <span>AIR GUARD</span>
          </span>
        </Link>

        <nav className="nav-section" aria-label="Monitoring">
          <span className="nav-title">MONITORING</span>
          {monitoringLinks.map(({ href, icon, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link${pathname === href ? " active" : ""}`}
              aria-current={pathname === href ? "page" : undefined}
            >
              <span aria-hidden="true">{icon}</span>
              <span className="nav-link-label">{label}</span>
              {label === "NOTIFICATIONS" && (
                <b className="notification-count">3</b>
              )}
            </Link>
          ))}
        </nav>

        <div className="sidebar-system">
          <span className="nav-title">SYSTEM</span>
          <div className="system-status">
            <i aria-hidden="true" />
            ESP32 CONNECTED
          </div>
          <div className="system-status">
            <i aria-hidden="true" />
            DATA STREAM ACTIVE
          </div>
        </div>

        <nav className="sidebar-bottom" aria-label="System">
          <Link
            href="/settings"
            className={`nav-link${pathname === "/settings" ? " active" : ""}`}
            aria-current={pathname === "/settings" ? "page" : undefined}
          >
            <span aria-hidden="true">⚙</span>
            <span className="nav-link-label">SETTINGS</span>
          </Link>
          <Link href="/" className="nav-link logout">
            <span aria-hidden="true">⏻</span>
            <span className="nav-link-label">LOG OUT</span>
          </Link>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <span className="breadcrumb">{breadcrumb}</span>
            <h1>{title}</h1>
          </div>
          <div className="topbar-status">
            <strong className="status-online">● {status}</strong>
            <time>{currentTime}</time>
          </div>
        </header>
        {children}
      </main>
      <div className="crt-overlay" aria-hidden="true" />
    </div>
  );
}