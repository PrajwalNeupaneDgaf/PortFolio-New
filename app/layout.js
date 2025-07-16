import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppContext from "./Context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PRAJWAL PORTFOLIO",
  description: "Hello I am fullstack web developer from jhapa nepal , has skills on web dev , MERN stack , Next js , Typescript , Postgress , Nest Js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <AppContext>
          <div className="bg-gray-100 min-h-[100dvh]">
              {children}
          </div>
      </AppContext>
      </body>
    </html>
  );
}
