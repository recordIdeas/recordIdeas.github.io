import React from 'react';
import { Link } from "react-router-dom";

export default function Home() {
  return <div>
    <main>
      <h2>Welcome To The Home Page</h2>
    </main>
    <nav>
      <ul>
        <li><Link to="/pages">pages</Link></li>
        <li><Link to="/users">users</Link></li>
        <li><Link to="/hooks">hooks</Link></li>
      </ul>
    </nav>
  </div>
}