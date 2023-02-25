import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Activity from "./pages/activities/Activity";
import Client from './pages/clients/Client';
import Dashboard from './pages/dashboard/Dashboard';
import ClientForm from './pages/clients/ClientForm';

export default function App() {
  return (
      <Routes>
        <Route path="/" exact element={<Dashboard/>} />
        <Route path="/activity/list" element={<Activity/>} />
        <Route path="/client/list" element={<Client/>} />
        <Route path="/client/detail/:id?" element={<ClientForm/>} />
      </Routes>
  );
}
