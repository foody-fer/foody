"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ChakraProvider value={defaultSystem}>
        <QueryClientProvider client={client}>
          <body>{children}</body>
        </QueryClientProvider>
      </ChakraProvider>
    </html>
  );
}
