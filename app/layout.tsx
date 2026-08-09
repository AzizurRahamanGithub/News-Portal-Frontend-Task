import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/components/providers/ReduxProvider";

export const metadata: Metadata = {
  title: "Interactive Teaching Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body style={{ margin: 0, padding: 0 }}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
