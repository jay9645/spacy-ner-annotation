import { Spin } from 'antd';
import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Annotation = lazy(() => import('../pages/Annotation/Annotation'));
const NotFound = lazy(() => import('../pages/Fallback/NotFound'));

const Router = () => {
  return (
    <Suspense fallback={<Spin size="large" />}>
      <Routes>
        <Route path={'/annotation'} element={<Annotation />}/>
        <Route path={'/notFound'} element={<NotFound />} />
        <Route path={'/*'} element={<NotFound />} />
        <Route path={'/'} element={<Navigate to={'/annotation'} />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
