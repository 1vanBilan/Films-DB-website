"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();

const inter = Inter({ subsets: ["latin"] });

const publicApiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjdmNmM0MWQ2YTUyMGEzM2E4ZjI4YWRiODc1M2EyZSIsIm5iZiI6MTcyMTg0Mjk2OC44OTQsInN1YiI6IjY2YTEzZDE4ZjdhMTE0YTA4M2UwZDkwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MT0N_4i_WUOPFnVXp6y-cdMovLgJln4P8-4763te7TI";

axios.defaults.headers.common["Authorization"] = `Bearer ${publicApiKey}`;
axios.defaults.baseURL = "https://api.themoviedb.org/3";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>{children}</body>
      </QueryClientProvider>
    </html>
  );
}
