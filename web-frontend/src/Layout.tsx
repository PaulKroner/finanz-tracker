import { Outlet, useLocation } from 'react-router'
import Footer from './pages/footer/page';
import Navbar from './components/navbar/page';

const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <main className="w-full flex flex-col min-h-screen px-4 md:px-20 pt-4">
      <Outlet />
      <Footer />
      {!isLoginPage && (
        <section className="sticky bottom-0 w-full">
          <Navbar />
        </section>
      )}
    </main>
  );
};

export default Layout;
