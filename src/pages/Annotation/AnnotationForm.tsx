import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Typography, Space } from 'antd';
import React, { useState } from 'react';

const { Title } = Typography;
const { TextArea } = Input;

type RequiredMark = boolean | 'optional';

const AnnotationForm: React.FC = () => {
  const [form] = Form.useForm();
  const [entities, setEntities] = useState(["PERSON", "LOCATION"]);
  const [text, setText] = useState("");
  const [annotatedEntities, setAnnotatedEntities] = useState([]);
  const [annotatedOutput, setAnnotatedOutput] = useState([]);
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);

  const onFill = () => {
    const value = form.getFieldValue("rawText");
    console.log(value);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ rawText: "", entity: "" }}
    >
      <Title level={3}>Input Entities</Title>
      <Form.Item label="Raw Text" name="rawText" tooltip="Input the text you would like to annotate here and click on 'Add Raw Text'">
        <TextArea rows={4} placeholder="Input raw text here" />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit Text
          </Button>
          <Button htmlType="button" onClick={onFill}>
            Fill
          </Button>
        </Space>
      </Form.Item>

      <Form.Item
        label="Entity"
        tooltip="'Input the entity name that you would like to annotate your text with.'"
      >
        <Input placeholder="Input named entity" />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit Text
          </Button>
          <Button htmlType="button" onClick={onFill}>
            Fill
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default AnnotationForm;