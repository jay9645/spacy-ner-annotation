import { Spin } from 'antd';
import React, { lazy, Suspense } from 'react';
import './style.css';

const AnnotationForm = lazy(() => import('./AnnotationForm'));

const Annotation = () => {
  return (
    <div className='centered'>
      <Suspense fallback={<Spin size='large' />}>
        <AnnotationForm />
      </Suspense>
    </div>
  );
};

export default Annotation;
