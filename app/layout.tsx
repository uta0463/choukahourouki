import type { Metadata } from "next";

import Sheet from '@/app/_components/Sheet'

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
        <Sheet>
          { children }
        </Sheet>
      </body>
    </html>
  );
}
