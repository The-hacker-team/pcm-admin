import "@mantine/core/styles.css";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Login } from "./auth/Login";
import { Route, Routes, Navigate } from "react-router-dom";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Overview } from "./pages/Overview";
import { RegisterUsers } from "./pages/RegisterUsers";
import { RegisterMembers } from "./pages/RegisterMembers";
import { Announcements } from "./pages/Announcements";
import { UpcomingEvents } from "./pages/UpcomingEvents";
import { Minutes } from "./pages/Minutes";
import { Visitors } from "./pages/Visitors";
import { PWABadge } from "./components/PWABadge";

function App() {
  return (
    <MantineProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route
            index
            element={<Navigate to="/dashboard/overview" replace />}
          />
          <Route path="overview" element={<Overview />} />
          <Route path="register-users" element={<RegisterUsers />} />
          <Route path="register-members" element={<RegisterMembers />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="upcoming-events" element={<UpcomingEvents />} />
          <Route path="minutes" element={<Minutes />} />
          <Route path="visitors" element={<Visitors />} />
        </Route>
      </Routes>
      <PWABadge />
    </MantineProvider>
  );
}

export default App;
