import './App.css'
import Dashboard from "./pages/dashboard/page"
import Navbar from "./components/navbar/page"

function App() {

  return (
    <>
      <div className="flex flex-col min-h-screen p-4 mb-16">
        <Dashboard />
        <section className="fixed bottom-0 w-full">
          <Navbar />
        </section>
        {/* Footer needs to stick to the bottom but above the navbar */}
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default App
