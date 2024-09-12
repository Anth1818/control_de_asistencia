import { Route, Routes } from "react-router-dom";
import PageHome from "./pages/PageHome";
import { PageTrabajadores } from "./pages/PageAsistencia";
import { UserProvider } from "./context/userContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="/home" element={<PageHome />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/asistencias" element={<PageTrabajadores />} />
          </Route>
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
