import type { Metadata } from "next";

import Sheet from '@/app/_components/Sheet'

export const metadata: Metadata = {
  metadataBase: new URL("https://choukahourouki.vercel.app/"),
  title: {
    template: "%s | 釣果放浪記",
    default: "釣果放浪記",
  },
  description: "釣果の情報を配信しております。",
  openGraph: {
    title: "釣果放浪記",
    description: "釣果の情報を配信しております。",
    // images: ["/ogp.png"],
  },
  alternates: {
    canonical: "https://choukahourouki.vercel.app/",
  }
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
