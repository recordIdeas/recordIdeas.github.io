import React from 'react';
import { Link } from "react-router-dom";

export default function pageList() {
  return <div>
    <nav>
      <ul>
        <li><Link to="/pages/wuziqi">wuziqi</Link></li>
        <li><Link to="/pages/about">about</Link></li>
        <li><Link to="/pages/about-us">about us</Link></li>
      </ul>
    </nav>
  </div>
}