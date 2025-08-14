import "@mantine/core/styles.css";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Login } from "./auth/Login";
import { Route, Routes } from "react-router-dom";
import Overview from "./dashboard/Overview";

function App() {
  return (
    <MantineProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/overview" element={<Overview />} />
        {/* <Route path="/overview" element={<div>Overview Page</div>} /> */}
      </Routes>
    </MantineProvider>
  );
}

export default App;
