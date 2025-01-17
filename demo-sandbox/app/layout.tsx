import type { Metadata } from "next";
import "./globals.css";
import Engine from "@/config/engine";
import StyledComponentsRegistry from "@/components/StyledComponentsRegistry";

export const metadata: Metadata = {
  title: "jmpark.dev FE Sandbox",
  description: "jmpark.dev FE Sandbox",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Engine>
              {children}
          </Engine>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
