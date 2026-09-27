"use client";

import { useState } from "react";
import AppShell from "../components/sidebar";
import {
  notifications,
  type NotificationType,
} from "../data";

type NotificationFilter = "all" | NotificationType;

const filters: NotificationFilter[] = [
  "all",
  "unsafe",
  "caution",
  "system",
];

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] =
    useState<NotificationFilter>("all");
  const visibleNotifications =
    activeFilter === "all"
      ? notifications
      : notifications.filter((item) => item.type === activeFilter);

  return (
    <AppShell
      breadcrumb="FUMETRIX / SYSTEM EVENTS"
      title="NOTIFICATIONS"
      status="MONITORING"
    >
      <section className="notification-toolbar" aria-label="Filter notifications">
        {filters.map((filter) => (
          <button
            className={`filter-button${activeFilter === filter ? " active" : ""}`}
            key={filter}
            type="button"
            aria-pressed={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter.toUpperCase()}
          </button>
        ))}
      </section>

      <section className="notification-list" aria-live="polite">
        {visibleNotifications.map((item) => (
          <article
            className={`notification-item ${item.type}`}
            key={`${item.time}-${item.title}`}
          >
            <i aria-hidden="true" />
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <time className="notification-time">{item.time}</time>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
