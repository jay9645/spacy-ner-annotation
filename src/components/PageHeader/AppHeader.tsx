import { Button, PageHeader } from 'antd';
import React from 'react';
import './style.css';

const AppHeader: React.FC = () => (
  <PageHeader
    className="site-page-header"
    title="Spacy NER Annotation App"
    extra={[
      <Button key="3">Operation</Button>,
    ]}
  />
);

export default AppHeader;