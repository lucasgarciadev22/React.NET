import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Activity from "./pages/activities/Activity";
import Client from './pages/clients/Client';

export default function App() {
  return (
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/clients" element={<Client/>} />
        <Route path="/activities" element={<Activity/>} />
      </Routes>
  );
}
const Home = () => (
  <div>
    <h1>Home</h1>
    <hr />
    <Link to='/clients'>Back to Client</Link>
  </div>
);
