import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.scss";

const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'], 
  variable: '--font-work-sans',
});;

export const metadata: Metadata = {
  title: "Lendsqr Login",
  description: "Login Page",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.className}`}>
        {children}
      </body>
    </html>
  );
}
