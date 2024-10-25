import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Transactions from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Home from "./pages/Home";
import {
  LOGIN_ROUTE,
  HOME_ROUTE,
  TRANSACTION_ROUTE,
  DASHBOARD_ROUTE,
  ADMIN_LOGIN_ROUTE,
} from "./constants";
import { TransactionContextProvider } from "./context/transactionContext";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN_ROUTE} element={<Login admin={false} />} />
        <Route path={ADMIN_LOGIN_ROUTE} element={<Login admin={true} />} />
        <Route
          path={HOME_ROUTE}
          element={
            <TransactionContextProvider>
              <Home />
            </TransactionContextProvider>
          }
        >
          <Route path={TRANSACTION_ROUTE} element={<Transactions />} />
          <Route path={DASHBOARD_ROUTE} element={<Dashboard />} />
        </Route>
      </Routes>
      <Toaster reverseOrder={false} position="top-center" />
    </BrowserRouter>
  );
};

export default App;
