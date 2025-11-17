import Navbar from "../components/Utilities/Navbar";
import Footer from "../components/Utilities/Footer";
import { AuthProvider } from "@/store/AuthContext";

export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </AuthProvider>
    </div>
  );
}
