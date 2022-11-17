import { Spin } from 'antd';
import React, { lazy, Suspense } from 'react';

const AnnotationForm = lazy(() => import('./AnnotationForm'));

const Annotation = () => {
  return (
    <>
      <Suspense fallback={<Spin size='large' />}>
        <AnnotationForm />
      </Suspense>
    </>
  );
};

export default Annotation;
