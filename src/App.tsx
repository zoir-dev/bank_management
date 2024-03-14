import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Auth from "./pages/auth"
import { useEffect } from "react";
import Home from "./pages/home";
import Monitoring from "./pages/monitoring";
function App() {
  const defaultTheme = JSON.parse(localStorage.getItem('theme') ?? `${window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    }`)

  const changeTheme = (val: boolean) => {
    localStorage.setItem("theme", JSON.stringify(val));
    val
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark')
  };

  useEffect(() => {
    changeTheme(defaultTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(defaultTheme)

  return (
    <div className="bg-background text-foreground">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>

    </div>

  )
}

export default App
