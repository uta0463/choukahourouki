import type { Metadata } from "next";
import "./styles/globals.scss";

export const metadata: Metadata = {
  title: "釣果放浪記",
  description: "釣果情報になります。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
