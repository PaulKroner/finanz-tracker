import './App.css'
import Dashboard from "./pages/dashboard/page"
import Navbar from "./components/navbar/page"
import Footer from './pages/footer/page'
import { ChartUpdateProvider } from './context/chartUpdateContext'

function App() {

  return (
    <>
      <ChartUpdateProvider>
        <div className="w-full flex flex-col min-h-screen px-4 pt-4">
          <Dashboard />

          {/* Footer needs to stick to the bottom but above the navbar */}
          <Footer />

        </div>
        <section className="sticky bottom-0 w-full">
          <Navbar />
        </section>
      </ChartUpdateProvider>
    </>
  )
}

export default App
