import React from 'react';
import { Link } from "react-router-dom";

export default function About() {
  return <div>
    <main>
      <h2>Welcome to the about page</h2>
    </main>
    <nav>
      <ol>
        <Link to="/pages">Page List</Link>
      </ol>

    </nav>
  </div>
}