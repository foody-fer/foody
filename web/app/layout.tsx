"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css';
import { useEffect } from "react";

const client = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ChakraProvider value={defaultSystem}>
        <QueryClientProvider client={client}>
          <body>{children}</body>
        </QueryClientProvider>
      </ChakraProvider>
    </html>
  );
}
