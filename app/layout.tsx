import InterfaceAudio from "./components/interface-audio";
import "./globals.css";

export const metadata = {
  title: "FumeTrix — Air Quality Guard",
  description: "Workstation solder fume exposure monitoring system.",
  icons: {
    icon: "/assets/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <InterfaceAudio />
      </body>
    </html>
  );
}