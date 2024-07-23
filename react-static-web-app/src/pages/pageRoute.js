import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from '../components/NotFound.js';
import Pages from './pages.js';
import PageList from './pageList.js';
import About from './pages/about.js';
import Wuziqi from './pages/wuziqi.js';

export default function pageRoute() {
  return  <Routes>
            <Route path="*" element={<NotFound />} />

            <Route path="pages" element={<Pages/>}>
              <Route index element={<PageList />} />
              <Route path="wuziqi" element={<Wuziqi />} />
              <Route path="about" element={<About />} />
              <Route path="about-us" element={<Navigate to="/pages/about" />} />
            </Route>
          </Routes>
}