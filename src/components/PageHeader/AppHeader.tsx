import { Button, PageHeader } from 'antd';
import React from 'react';
import './style.css';
import { GithubOutlined } from '@ant-design/icons';

const AppHeader: React.FC = () => (
  <PageHeader
    className="site-page-header"
    title="Spacy NER Annotation App"
    extra={[
      <Button icon={<GithubOutlined />} href='https://github.com/jay9645/spacy-ner-annotation'>GitHub</Button>,
    ]}
  />
);

export default AppHeader;