import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CallerPage from '@/pages/CallerPage';
import CalleePage from '@/pages/CalleePage';
import GroupPage from '@/pages/GroupPage';
import GroupGuestPage from '@/pages/GroupGuestPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/caller" element={<CallerPage />} />
        <Route path="/callee" element={<CalleePage />} />
        <Route path="/group" element={<GroupPage />} />
        <Route path="/guest" element={<GroupGuestPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
