import { Route, Routes } from "react-router";
import "./App.css";
import Dashboard from "./views/Dashboard";
import OrderRegistryView from "./views/OrderRegistryView";
import SellerView from './views/SellerView';
import OrderRegistryFormWrapper from "./components/order-registry-components/OrderRegistryFormWrapper";
import SellerFormWrapper from "./components/seller-components/SellerFormWrapper";
import SellerLogsWrapper from './components/seller-components/SellerLogsWrapper';


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/orders/*" element={<OrderRegistryView/>}/>
      <Route path="/orders/detail/:id" element={<OrderRegistryFormWrapper/>}/>
      <Route path="/sellers/*" element={<SellerView/>}/>
      <Route path="/sellers/detail/:id" element={<SellerFormWrapper/>}/>
      <Route path="/sellers/sellerlogs/:id" element={<SellerLogsWrapper/>}/>
      <Route path="/orders/orderlogs/id" element={<Dashboard/>}/>
    </Routes>
  );
};

export default App;
