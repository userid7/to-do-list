import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <div class="flex flex-col min-h-screen min-w-max bg-gradient-to-r from-cyan-500 to-blue-500 backdrop-blur justify-between">
      <Navbar />
      <main className="h-full">{children}</main>
      <Footer />
    </div>
  );
}
