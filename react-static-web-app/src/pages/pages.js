import React from "react";
import { Outlet } from "react-router-dom";

export default function Pages() {
  return  <div>
    <h1>Pages</h1>

    <Outlet />
  </div>
}