import Navbar from "../components/Utilities/Navbar";
import Footer from "../components/Utilities/Footer";

export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main >{children}</main>
      <Footer />
    </div>
  );
}
