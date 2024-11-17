import Footer from "./footer/page";
import Main from "./main/page";
import Navbar from "./navbar/page";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Main/>
      <Footer />
    </div>
  );
}
