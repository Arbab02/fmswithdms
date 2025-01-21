import { Inter } from "next/font/google";
import "./globals.css";

import Sidebar from '@/components/Sidebar.jsx'

import Footer from '@/components/Footer.jsx'
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Finance Management System",
  description: "Leading Finance Management System",
};

export default function RootLayout({ children }) {
  return (
      // <ClerkProvider>
    <html lang="en">
     
      <body className={inter.className}>
      <Sidebar/>
     
        {children}
        {/* <Footer/> */}
        {/* <script src="../path/to/flowbite/dist/flowbite.min.js"></script> */}
        </body>
    </html>
        // </ClerkProvider>
  );
}
