import "./App.css";
import { Routes, Route } from "react-router-dom";
import Activity from "./pages/activities/Activity";
import Client from "./pages/clients/Client";
import Dashboard from "./pages/dashboard/Dashboard";
import ClientForm from "./pages/clients/ClientForm";
import PageNotFound from "./pages/PageNotFound";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/activity/*" element={<Activity />} />
      <Route path="/activity/:id/client" element={<Client />} />
      <Route path="/client/*" element={<Client />} />
      <Route path="/client/:id/activity" element={<Activity />} />
      <Route path="/client/detail/" element={<ClientForm />} />
      <Route path="/client/detail/:id?" element={<ClientForm />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;

