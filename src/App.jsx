import { Route, Routes } from "react-router-dom";
import PageHome from "./pages/PageHome";
import { PageTrabajadores } from "./pages/PageTrabajadores";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/home" element={<PageHome />} />
        <Route path="trabajadores" element={<PageTrabajadores />} />
      </Routes>
    </>
  )
}

export default App
