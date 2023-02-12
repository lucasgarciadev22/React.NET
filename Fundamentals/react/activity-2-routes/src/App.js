import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Activity from "./pages/activities/Activity";

export default function App() {
  return (
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/clients" element={<Client/>} />
        <Route path="/activities" element={<Activity/>} />
      </Routes>
  );
}

const Client = () => (
  <div>
    <h1>Client</h1>
    <hr />
    <Link to='/'>Back to Home</Link>
  </div>
);

const Home = () => (
  <div>
    <h1>Home</h1>
    <hr />
    <Link to='/clients'>Back to Client</Link>
  </div>
);
