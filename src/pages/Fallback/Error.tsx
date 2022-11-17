import { Button, Result } from 'antd';
import React from 'react';

const Error: React.FC = () => (
  <Result
    status="error"
    title="Error"
    subTitle="Sorry, something went wrong."
    extra={
      <Button 
        type="primary"
        onClick={() => window.history.back()}
      >
        Go Back
      </Button>
    }
  />
);

export default Error;