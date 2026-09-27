"use client";

import { useEffect, useState } from "react";
import AppShell from "../components/sidebar";

type SensorReadings = {
  pm25: number;
  voc: number;
  temperature: number;
  airflow: number;
};

const initialReadings: SensorReadings = {
  pm25: 12.4,
  voc: 348,
  temperature: 29.4,
  airflow: 82,
};

function fluctuate(value: number, amount: number) {
  return value + (Math.random() * amount * 2 - amount);
}

export default function DashboardPage() {
  const [sensorReadings, setSensorReadings] =
    useState<SensorReadings>(initialReadings);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSensorReadings((current) => ({
        pm25: Math.max(0, fluctuate(current.pm25, 1.5)),
        voc: Math.max(0, fluctuate(current.voc, 15)),
        temperature: fluctuate(current.temperature, 0.2),
        airflow: Math.min(100, Math.max(0, fluctuate(current.airflow, 2))),
      }));
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  const sensors = [
    {
      id: "PM-01",
      name: "PARTICULATE MATTER",
      value: sensorReadings.pm25.toFixed(1),
      unit: "µg/m³",
      status: "NORMAL",
    },
    {
      id: "GAS-01",
      name: "VOC CONCENTRATION",
      value: Math.round(sensorReadings.voc).toString(),
      unit: "ppb",
      status: "NORMAL",
    },
    {
      id: "TMP-01",
      name: "TEMPERATURE",
      value: sensorReadings.temperature.toFixed(1),
      unit: "°C",
      status: "NORMAL",
    },
    {
      id: "AIR-01",
      name: "AIRFLOW",
      value: Math.round(sensorReadings.airflow).toString(),
      unit: "%",
      status: "ACTIVE",
    },
  ];

  return (
    <AppShell
      breadcrumb="FUMETRIX / MONITORING"
      title="DASHBOARD"
      status="ONLINE"
    >
      <section className="status-grid">
        <div className="exposure-card">
          <div className="card-label">CURRENT EXPOSURE</div>
          <div className="safe-status">SAFE</div>
          <div className="exposure-number">024</div>
          <div className="meter">
            <div className="meter-fill safe-fill" style={{ width: "24%" }} />
          </div>
          <span>EXPOSURE INDEX</span>
        </div>

        <div className="extraction-card">
          <div className="card-label">EXTRACTION STATUS</div>
          <div className="extraction-status">
            <i aria-hidden="true" />
            ACTIVE
          </div>
          <div className="airflow-big">
            {Math.round(sensorReadings.airflow)}%
          </div>
          <div className="airflow-bar">
            <div style={{ width: `${sensorReadings.airflow}%` }} />
          </div>
          <span>EXTRACTOR AIRFLOW</span>
        </div>
      </section>

      <section className="sensor-grid" aria-label="Live sensor readings">
        {sensors.map((sensor) => (
          <article className="sensor-card" key={sensor.id}>
            <div className="sensor-header">
              <span>{sensor.id}</span>
              <i className="sensor-dot" aria-hidden="true" />
            </div>
            <p>{sensor.name}</p>
            <strong>{sensor.value}</strong>
            <span className="unit">{sensor.unit}</span>
            <div className="sensor-status">{sensor.status}</div>
          </article>
        ))}
      </section>

      <section className="panel chart-panel">
        <div className="panel-title">
          <div>
            <span>TELEMETRY</span>
            <h2>EXPOSURE HISTORY</h2>
          </div>
          <div className="chart-controls">LAST 24 HOURS</div>
        </div>
        <div className="chart" role="img" aria-label="Exposure history chart">
          <div className="chart-grid" />
          <svg viewBox="0 0 900 260" preserveAspectRatio="none">
            <polyline
              points="0,200 80,185 160,195 240,140 320,155 400,110 480,125 560,80 640,105 720,65 800,95 900,60"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
          <div className="chart-labels">
            {["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"].map(
              (time) => (
                <span key={time}>{time}</span>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="dashboard-bottom">
        <article className="panel session-panel">
          <div className="panel-title">
            <div>
              <span>SESSION</span>
              <h2>EXPOSURE SUMMARY</h2>
            </div>
          </div>
          <div className="session-time">04:21:37</div>
          <div className="session-row">
            <span>SAFE TIME</span>
            <strong>03:48:22</strong>
          </div>
          <div className="session-row">
            <span>CAUTION TIME</span>
            <strong>00:29:12</strong>
          </div>
          <div className="session-row">
            <span>UNSAFE TIME</span>
            <strong>00:04:03</strong>
          </div>
        </article>

        <article className="panel alert-panel">
          <div className="panel-title">
            <div>
              <span>RECENT EVENTS</span>
              <h2>NOTIFICATIONS</h2>
            </div>
            <a href="/notifications">VIEW ALL</a>
          </div>
          <div className="mini-alert">
            <i className="warning" aria-hidden="true" />
            <div>
              <strong>Extractor airflow warning</strong>
              <span>22:32:14</span>
            </div>
          </div>
          <div className="mini-alert">
            <i className="caution" aria-hidden="true" />
            <div>
              <strong>Exposure level elevated</strong>
              <span>21:48:02</span>
            </div>
          </div>
        </article>
      </section>
    </AppShell>
  );
}
