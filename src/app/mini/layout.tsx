"use client";

import { SessionProvider } from "next-auth/react";

export default function MiniLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container mx-auto p-4">
      <SessionProvider>{children}</SessionProvider>
    </main>
  );
}
