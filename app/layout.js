import { ClerkProvider } from "@clerk/nextjs";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Invoicer | Generate and create online!",
  description: "Invoicer | Generate and create invoice online! ",
  twitter: {
    card: "summary_large_image",
  },
  openGraph : {
    images: "/opengraph-image.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </ClerkProvider>
  );
}
