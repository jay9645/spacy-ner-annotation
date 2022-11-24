import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Typography, Space } from 'antd';
import React, { useState } from 'react';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

type RequiredMark = boolean | 'optional';

const AnnotationForm: React.FC = () => {
  const [form] = Form.useForm();
  const [entities, setEntities] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [annotatedEntities, setAnnotatedEntities] = useState<string[]>([]);
  const [annotatedOutput, setAnnotatedOutput] = useState<string[]>([]);

  interface EntityProps {
    value: string;
  }

  const EntityButton = (props: EntityProps) => {
    return <Button onClick={() => onAddEntityAnnotation(props.value)}>
      {props.value}
    </Button>;
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

  const onAddEntityAnnotation = (entityName: string) => {
    const selection = window.getSelection();
    const selEnd1 = selection!.anchorOffset;
    const selEnd2 = selection!.focusOffset;
    const start = Math.min(selEnd1, selEnd2);
    const end = Math.max(selEnd1, selEnd2);
    const annotation = `(${start},${end},"${entityName}")`;
    setAnnotatedEntities(prev => [...prev, annotation]);
  }

  const onGenerateAnnotations = () => {
    const newAnnotation = `("${text}",{"entities":[${annotatedEntities}]}),`;
    setAnnotatedOutput(prev => [...prev, newAnnotation]);
  };

  const onDownloadOutput = () => {
    const fileData = annotatedOutput.join('\n');
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "annotated-output.txt";
    link.href = url;
    link.click();
  };

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
          <Button type="primary" onClick={onAddText} htmlType="submit">
            Add Text
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

      {(entities.length > 0 || text.length > 0) && <Title level={3}>Annotate</Title>}

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
      <Form.Item label="Annotate Text" tooltip="To annotate, highlight the text to be annotated, then click on the button with the entity name.">
        <Paragraph><pre>{text}</pre></Paragraph>
      </Form.Item>}

      {annotatedEntities.length > 0 && <Form.Item label="Annotated Entities">
        <Paragraph>{annotatedEntities.join('\n')}</Paragraph>
        <Button
          type="primary"
          onClick={onGenerateAnnotations}
        >
          Generate Annotation
        </Button>
        <Button
          type="ghost"
          onClick={() => setAnnotatedEntities([])}
          className="button"
        >
          Clear Annotated Entities
        </Button>
      </Form.Item>}

      {annotatedOutput.length > 0 && <Form.Item>
        <Title level={3}>Annotated Output</Title>
        <Paragraph>{annotatedOutput.join('\n')}</Paragraph>
        <Button
          type="primary"
          onClick={onDownloadOutput}
        >
          Download Output
        </Button>
        <Button
          onClick={() => setAnnotatedOutput([])}
        >
          Clear Annotated Output
        </Button>
      </Form.Item>}
    </Form>
  );
};

export default AnnotationForm;