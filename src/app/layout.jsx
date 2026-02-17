import { Onest } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";

const onest = Onest({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "FlowEdit",
  description: "FlowEdit Website",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
    <html lang="en">
      
      <body className="antialiased bg-[#A5C9E8]">{children}</body>
      
    </html>
    </Providers>
  );
}
