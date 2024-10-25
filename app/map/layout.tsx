import type { Metadata } from "next";
import "../styles/globals.scss";

export const metadata: Metadata = {
  title: "マップ | 釣果放浪記",
  description: "釣果放浪記のマップページになります。",
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
