"use client";

import { useState } from "react";
import AppShell from "../components/sidebar";
import { readings, type Reading, type ReadingStatus } from "../data";

type SensorFilter = "all" | "PM2.5" | "VOC" | "Temperature" | "Airflow";

type SensorColumn = {
  label: string;
  value: (reading: Reading) => string;
};

const sensorColumns: Record<Exclude<SensorFilter, "all">, SensorColumn> = {
  "PM2.5": {
    label: "PM2.5",
    value: (reading) => `${reading.pm.toFixed(1)} µg/m³`,
  },
  VOC: {
    label: "VOC",
    value: (reading) => `${reading.voc} ppb`,
  },
  Temperature: {
    label: "TEMP",
    value: (reading) => `${reading.temperature.toFixed(1)} °C`,
  },
  Airflow: {
    label: "AIRFLOW",
    value: (reading) => `${reading.airflow}%`,
  },
};

const statusClass: Record<ReadingStatus, string> = {
  SAFE: "safe",
  CAUTION: "caution",
  UNSAFE: "unsafe",
};

export default function ReadingsPage() {
  const [sensorFilter, setSensorFilter] = useState<SensorFilter>("all");
  const [selectedReading, setSelectedReading] = useState<Reading | null>(null);

  const visibleColumns =
    sensorFilter === "all"
      ? Object.values(sensorColumns)
      : [sensorColumns[sensorFilter]];

  function exportReadings() {
    const rows = [
      ["TIME", "PM2.5", "VOC", "TEMPERATURE", "AIRFLOW", "STATUS"],
      ...readings.map((reading) => [
        reading.time,
        reading.pm.toFixed(1),
        String(reading.voc),
        reading.temperature.toFixed(1),
        String(reading.airflow),
        reading.status,
      ]),
    ];
    const csv = rows.map((row) => row.join(",")).join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "fumetrix-readings.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  return (
    <AppShell
      breadcrumb="FUMETRIX / TELEMETRY"
      title="SENSOR READINGS"
      status="LIVE"
    >
      <section className="reading-toolbar">
        <label>
          <span>SENSOR SOURCE</span>
          <select
            value={sensorFilter}
            onChange={(event) =>
              setSensorFilter(event.currentTarget.value as SensorFilter)
            }
          >
            <option value="all">ALL SENSORS</option>
            <option value="PM2.5">PM2.5</option>
            <option value="VOC">VOC</option>
            <option value="Temperature">TEMPERATURE</option>
            <option value="Airflow">AIRFLOW</option>
          </select>
        </label>
        <label>
          <span>TIME RANGE</span>
          <select defaultValue="24h">
            <option value="24h">LAST 24 HOURS</option>
            <option value="7d">LAST 7 DAYS</option>
          </select>
        </label>
        <button
          className="industrial-button small-button"
          type="button"
          onClick={exportReadings}
        >
          EXPORT DATA
        </button>
      </section>

      <section className="panel readings-panel">
        <div className="panel-title">
          <div>
            <span>TELEMETRY DATABASE</span>
            <h2>COMPLETE SENSOR LOG</h2>
          </div>
          <span>AUTO REFRESH: 05 SEC</span>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th scope="col">TIME</th>
                {visibleColumns.map((column) => (
                  <th scope="col" key={column.label}>
                    {column.label}
                  </th>
                ))}
                <th scope="col">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {readings.map((reading) => (
                <tr
                  key={reading.time}
                  tabIndex={0}
                  aria-label={`Select reading from ${reading.time}`}
                  onClick={() => setSelectedReading(reading)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedReading(reading);
                    }
                  }}
                >
                  <td>{reading.time}</td>
                  {visibleColumns.map((column) => (
                    <td key={column.label}>{column.value(reading)}</td>
                  ))}
                  <td>
                    <span
                      className={`reading-status ${statusClass[reading.status]}`}
                    >
                      {reading.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel reading-detail">
        <div className="panel-title">
          <div>
            <span>SELECTED RECORD</span>
            <h2>READING DETAILS</h2>
          </div>
        </div>
        <div className="detail-grid">
          {[
            {
              label: "TIMESTAMP",
              value: selectedReading?.time ?? "—",
            },
            {
              label: "PM2.5",
              value: selectedReading
                ? `${selectedReading.pm.toFixed(1)} µg/m³`
                : "—",
            },
            {
              label: "VOC",
              value: selectedReading ? `${selectedReading.voc} ppb` : "—",
            },
            {
              label: "TEMPERATURE",
              value: selectedReading
                ? `${selectedReading.temperature.toFixed(1)} °C`
                : "—",
            },
            {
              label: "AIRFLOW",
              value: selectedReading ? `${selectedReading.airflow}%` : "—",
            },
            {
              label: "CLASSIFICATION",
              value: selectedReading?.status ?? "—",
            },
          ].map(({ label, value }) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
