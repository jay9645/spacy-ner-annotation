import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Typography, Space } from 'antd';
import React, { useState } from 'react';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

type RequiredMark = boolean | 'optional';

const AnnotationForm: React.FC = () => {
  const [form] = Form.useForm();
  const [entities, setEntities] = useState(["PERSON", "LOCATION"]);
  const [text, setText] = useState("");
  const [annotatedEntities, setAnnotatedEntities] = useState([]);
  const [annotatedOutput, setAnnotatedOutput] = useState([]);
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);

  interface EntityProps {
    value: string;
  }

  const EntityButton = (props: EntityProps) => {
    return <Button>{props.value}</Button>;
  }

  interface EntityListProps {
    list: Array<string>
  }

  const EntityList = (props: EntityListProps) => {
    const list = props.list;
    return <>{list.map((entity) =>
      <EntityButton 
        key={entity}
        value={entity} 
      />
    )}</>;
  }

  const onAddText = () => {
    const value = form.getFieldValue("rawText");
    setText(value);
    form.setFieldValue("rawText", "");
  };

  const onAddEntity = () => {
    const value = form.getFieldValue("entity");
    setEntities(prev => [...prev, value]);
    form.setFieldValue("entity", "");
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ rawText: "", entity: "" }}
    >
      <Title level={3}>Input</Title>
      <Form.Item label="Raw Text" name="rawText" tooltip="Input the text you would like to annotate here and click on 'Add Text'">
        <TextArea rows={4} placeholder="Input raw text here" />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Add Text
          </Button>
          <Button htmlType="button" onClick={onAddText}>
            Fill
          </Button>
        </Space>
      </Form.Item>

      <Form.Item
        label="Entity"
        name="entity"
        tooltip="Input the entity name that you would like to annotate your text with."
      >
        <Input placeholder="Input named entity" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={onAddEntity}>Add Named Entity</Button>
      </Form.Item>

      <Title level={3}>Annotate</Title>

      {entities.length > 0 && <Form.Item>
        <EntityList list={entities}/>
        <Button
          type="ghost"
          onClick={() => setEntities([])}
        >
          Clear Named Entities
        </Button>
      </Form.Item>}

      {text.length > 0 &&
      <Form.Item label="Annotate Text" tooltip="Input the entity name that you would like to annotate your text with.">
        <Paragraph><pre>{text}</pre></Paragraph>
      </Form.Item>}
    </Form>
  );
};

export default AnnotationForm;