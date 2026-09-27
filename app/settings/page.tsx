"use client";

import { useState, type FormEvent } from "react";
import AppShell from "../components/sidebar";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <AppShell
      breadcrumb="FUMETRIX / SYSTEM"
      title="SETTINGS"
      status="ONLINE"
    >
      <section className="settings-grid">
        <form className="panel settings-panel" onSubmit={saveProfile}>
          <div className="panel-title">
            <div>
              <span className="card-label">OPERATOR PROFILE</span>
              <h2>ACCESS IDENTITY</h2>
            </div>
            <span className="settings-code">FMX-01</span>
          </div>
          <label className="settings-field">
            OPERATOR ID
            <input type="text" defaultValue="OPERATOR-01" required />
          </label>
          <label className="settings-field">
            REGISTERED CONTACT
            <input
              type="email"
              defaultValue="operator@fumetrix.local"
              required
            />
          </label>
          <label className="settings-field">
            SESSION TIMEOUT
            <select defaultValue="30">
              <option value="30">30 MINUTES</option>
              <option value="60">60 MINUTES</option>
              <option value="never">NEVER</option>
            </select>
          </label>
          <button className="industrial-button small-button" type="submit">
            SAVE PROFILE
          </button>
          <p className="form-message success" aria-live="polite">
            {saved ? "PROFILE SETTINGS SAVED." : ""}
          </p>
        </form>

        <section className="panel settings-panel">
          <div className="panel-title">
            <div>
              <span className="card-label">ALERT CONTROL</span>
              <h2>NOTIFICATION RULES</h2>
            </div>
          </div>
          <label className="settings-toggle">
            <input type="checkbox" defaultChecked />
            <span>CRITICAL EXPOSURE ALERTS</span>
            <small>Notify when exposure reaches unsafe levels.</small>
          </label>
          <label className="settings-toggle">
            <input type="checkbox" defaultChecked />
            <span>AIRFLOW FAILURE ALERTS</span>
            <small>Notify when extractor performance drops.</small>
          </label>
          <label className="settings-toggle">
            <input type="checkbox" />
            <span>DAILY STATUS REPORT</span>
            <small>Send a summary at the end of each shift.</small>
          </label>
        </section>

        <section className="panel settings-panel">
          <div className="panel-title">
            <div>
              <span className="card-label">SENSOR CONFIGURATION</span>
              <h2>THRESHOLD PROFILE</h2>
            </div>
          </div>
          <div className="settings-readout">
            <span>PM2.5 WARNING LEVEL</span>
            <strong>
              35 <small>µg/m³</small>
            </strong>
          </div>
          <div className="settings-readout">
            <span>VOC WARNING LEVEL</span>
            <strong>
              250 <small>ppb</small>
            </strong>
          </div>
          <div className="settings-readout">
            <span>MINIMUM AIRFLOW</span>
            <strong>
              0.80 <small>m/s</small>
            </strong>
          </div>
          <p className="settings-note">
            Threshold changes require supervisor authorization.
          </p>
        </section>

        <section className="panel settings-panel">
          <div className="panel-title">
            <div>
              <span className="card-label">SYSTEM INFORMATION</span>
              <h2>FUMETRIX CORE</h2>
            </div>
          </div>
          <div className="settings-list">
            <span>FIRMWARE</span>
            <strong>2.4.1</strong>
          </div>
          <div className="settings-list">
            <span>DEVICE ID</span>
            <strong>ESP32-FMX-01</strong>
          </div>
          <div className="settings-list">
            <span>LAST SYNC</span>
            <strong>JUST NOW</strong>
          </div>
          <div className="settings-list">
            <span>DATA RETENTION</span>
            <strong>30 DAYS</strong>
          </div>
        </section>
      </section>
    </AppShell>
  );
}
