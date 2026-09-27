<img width="1907" height="862" alt="image" src="https://github.com/user-attachments/assets/2e164ff0-8168-40ca-a59c-d706029b3364" />
<img width="1890" height="855" alt="image" src="https://github.com/user-attachments/assets/f6a46314-80c0-43ce-9ea0-a1b873616750" />


# Fumetrix Embedded System

Fumetrix is an industrial air-quality monitoring dashboard for a solder fume extraction workstation. The interface provides operator access, telemetry views, alert monitoring, and system settings for a connected environmental sensor network.

## Overview

This project presents a retro-industrial control-panel interface built with Next.js and React. It includes:

- secure login and account access screens
- live dashboard with sensor telemetry
- readings history and exportable telemetry data
- notifications and alert filtering
- system settings configuration panels
- a responsive industrial UI inspired by embedded monitoring systems

## Technology stack

- Next.js 15
- React 19
- TypeScript
- CSS for custom industrial styling

## Project structure

- `app/` – application routes and UI pages
- `app/components/` – shared UI shell and interface helpers
- `app/data.ts` – telemetry and notification seed data
- `public/assets/` – static SVG assets
- `next.config.ts` – Next.js configuration

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open http://localhost:3000 in the browser.

### Production build

```bash
npm run build
```

### Start production build

```bash
npm run start
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
