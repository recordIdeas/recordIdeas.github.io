import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from './base/home.js';
import PageRoute from './pages/pageRoute.js';
import HookRoute from './hooks/hookRoute.js';
import UserRoute from './users/userRoute.js';


export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageRoute />} />
          <Route path="hooks/*" element={<HookRoute />} />
          <Route path="users/*" element={<UserRoute />} />
        </Routes>
      </header>
    </div>
  );
}