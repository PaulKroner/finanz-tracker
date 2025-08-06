import Footer from './pages/footer/page';
import Navbar from './components/navbar/page';
import type { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="w-full flex flex-col min-h-screen px-4 md:px-20 pt-4">
        {children}
        <Footer />
      </main>
      <section className="sticky bottom-0 w-full">
        <Navbar />
      </section>
    </>
  );
};

export default Layout;
