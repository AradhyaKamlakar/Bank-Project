import logo from "./logo.svg";
import "./App.css";
import { createContext, useEffect, useState } from "react";
import Customer from "./Layouts/Customer";

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Manager from "./Layouts/Manager";
import Login from "./Layouts/Login";
import Register from "./Layouts/Register";
import { Body } from "./Components/Body";

export const AppContext = createContext();

function App() {

const [rootUser, setRootUser] = useState({})
  

  return (
    <AppContext.Provider value={{
      rootUser,
      setRootUser,
    }}>
      {/* <Customer /> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="*" element={<Body />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
