import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "./provider";
import AppProvider from "./appProvider";
const myFont = localFont({
  src: [
    {
      path: "../../public/fonts/DMSans-Medium.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-dmsans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${myFont.className}  antialiased`}>
        <Provider>
          <AppProvider>{children}</AppProvider>
        </Provider>
      </body>
    </html>
  );
}
