import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  authContext,
  USERLOCALSTORAGE,
} from "./contexts/authContext/AuthProvider";
import Home from "./pages/home/Home";
import MainLayout from "./pages/layout/MainLayout";
import Profile from "./pages/profile/Profile";

function App() {
  const userCtx = useContext(authContext);
  // NOTE: Update localStorage when authContext refreshed
  useEffect(() => {
    localStorage.setItem(USERLOCALSTORAGE, JSON.stringify(userCtx.state.user));
  }, [userCtx.state]);

  return (
    <div className="bg-black text-white min-h-screen w-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
