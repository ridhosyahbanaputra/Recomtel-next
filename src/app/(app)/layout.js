import Navbar from "../components/Utilities/Navbar";
import Footer from "../components/Utilities/Footer";
import { AuthProvider } from "@/store/AuthContext";

export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <AuthProvider>
        <Navbar />
        <main className="w-full max-w-full overflow-x-hidden">{children}</main>
        <Footer />
      </AuthProvider>
    </div>
  );
}
