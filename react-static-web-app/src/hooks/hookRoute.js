import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from '../components/NotFound.js';
import HookList from './hookList.js';

import UserLayoutEffect from './userLayoutEffect';
import UseEffect from './useEffect';
import UseTransition from './useTransition';
import UseCallback from './useCallback';
import UseContext from './useContext';
import UseReducer from './useReducer';
import UseImmerReducer from './useImmerReducer';

export default function Hooks() {
  return <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<HookList />} />
            <Route path="userLayoutEffect" element={<UserLayoutEffect />} />
            <Route path="useEffect" element={<UseEffect />} />
            <Route path="useTransition" element={<UseTransition />} />
            <Route path="useCallback" element={<UseCallback />} />
            <Route path="useContext" element={<UseContext />} />
            <Route path="useReducer" element={<UseReducer />} />
            <Route path="useImmerReducer" element={<UseImmerReducer />} />
          </Routes>
}