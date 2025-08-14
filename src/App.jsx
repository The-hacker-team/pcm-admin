import "@mantine/core/styles.css";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Login } from "./auth/Login";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./dashboard/Dashboard";

function App() {
  return (
    <MantineProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/overview" element={<div>Overview Page</div>} /> */}
      </Routes>
    </MantineProvider>
  );
}

export default App;
