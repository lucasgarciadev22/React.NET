import { Route, Routes } from "react-router";
import "./App.css";
import Dashboard from "./views/Dashboard";
import OrderRegistryView from "./views/OrderRegistryView";
import SellerView from './views/SellerView';
import SellerForm from './components/SellerComponents/SellerForm';
import OrderRegistryForm from './components/OrderRegistryComponents/OrderRegistryForm';
import OrderRegistryFormWrapper from './components/OrderRegistryComponents/OrderRegistryFormWrapper';
import SellerFormWrapper from './components/SellerComponents/SellerFormWrapper';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/orders/*" element={<OrderRegistryView/>}/>
      <Route path="/orders/detail/:id" element={<OrderRegistryFormWrapper/>}/>
      <Route path="/sellers/*" element={<SellerView/>}/>
      <Route path="/sellers/detail/:id" element={<SellerFormWrapper/>}/>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/" element={<Dashboard/>}/>
    </Routes>
  );
};

export default App;
