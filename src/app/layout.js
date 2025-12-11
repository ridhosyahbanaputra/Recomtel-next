import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/store/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});
export const metadata = {
  title: "Recomtel",
  description: "Sebuah Website Reckomendasi Kuota Internet",
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${poppins.className}`}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
