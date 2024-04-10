import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Auth from "./pages/auth"
import { useEffect } from "react";
import Home from "./pages/home";
import Monitoring from "./pages/monitoring";
import { Toaster } from "react-hot-toast";
import Admins from "./pages/admins";
import History from "./pages/history";
function App() {
  const defaultTheme = (localStorage.getItem('theme') ?? `${window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    }`) === 'true' ? true : false

  const changeTheme = (val: boolean) => {
    localStorage.setItem("theme", `${val}`);
    val
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark')
  };

  useEffect(() => {
    changeTheme(defaultTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="bg-background text-foreground">
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{ className: '!bg-content2 !text-foreground' }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/history" element={<History />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>

    </div>

  )
}

export default App
