export type ReadingStatus = "SAFE" | "CAUTION" | "UNSAFE";

export type Reading = {
  time: string;
  pm: number;
  voc: number;
  temperature: number;
  airflow: number;
  status: ReadingStatus;
};

export type NotificationType = "unsafe" | "caution" | "system";

export type SystemNotification = {
  type: NotificationType;
  title: string;
  description: string;
  time: string;
};

export const readings: Reading[] = [
  {
    time: "22:41:08",
    pm: 12.4,
    voc: 348,
    temperature: 29.4,
    airflow: 82,
    status: "SAFE",
  },
  {
    time: "22:41:03",
    pm: 13.1,
    voc: 351,
    temperature: 29.3,
    airflow: 81,
    status: "SAFE",
  },
  {
    time: "22:40:58",
    pm: 14.2,
    voc: 372,
    temperature: 29.3,
    airflow: 80,
    status: "SAFE",
  },
  {
    time: "22:40:53",
    pm: 18.7,
    voc: 410,
    temperature: 29.4,
    airflow: 76,
    status: "CAUTION",
  },
  {
    time: "22:40:48",
    pm: 21.2,
    voc: 447,
    temperature: 29.5,
    airflow: 72,
    status: "CAUTION",
  },
  {
    time: "22:40:43",
    pm: 29.5,
    voc: 512,
    temperature: 29.7,
    airflow: 64,
    status: "UNSAFE",
  },
  {
    time: "22:40:38",
    pm: 24.1,
    voc: 489,
    temperature: 29.6,
    airflow: 68,
    status: "CAUTION",
  },
];

export const notifications: SystemNotification[] = [
  {
    type: "unsafe",
    title: "UNSAFE EXPOSURE DETECTED",
    description:
      "Fume concentration and airflow conditions indicate an unsafe workstation state.",
    time: "22:40:43",
  },
  {
    type: "caution",
    title: "EXTRACTOR PERFORMANCE WARNING",
    description:
      "Airflow dropped below expected extraction level while VOC concentration increased.",
    time: "22:32:14",
  },
  {
    type: "caution",
    title: "EXPOSURE LEVEL ELEVATED",
    description: "PM2.5 concentration exceeded the normal operating range.",
    time: "21:48:02",
  },
  {
    type: "system",
    title: "EXTRACTOR AIRFLOW RESTORED",
    description:
      "Airflow has returned to the expected extraction range.",
    time: "21:51:22",
  },
  {
    type: "system",
    title: "SYSTEM INITIALIZED",
    description:
      "ESP32 controller successfully connected to all configured sensors.",
    time: "18:03:11",
  },
];
