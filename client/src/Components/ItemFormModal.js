import React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, InputNumber, DatePicker, Space, Select } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CATEGORIES} from '../utils/queries';

const { Option } = Select;

function ItemFormModal({ handleSubmit }) {
  const [visible, setVisible] = useState(false); // state to control the visibility of the modal
  const [form] = Form.useForm();
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!loading && !error) {
      setCategories(data.categories);
    }
  }, [data, loading, error]);

  const categoryOptions = categories.map((category) => (
    <Option key={category._id} value={category.name}>
      {category.name}
    </Option>
  ));

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      handleSubmit(values);
      form.resetFields();
      setVisible(false);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const handleCategoryChange = (value) => {
    form.setFieldsValue({ category: value });
  };

 

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Item
      </Button>
      <Modal
        title="Add Item"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true} // reset the form when the modal is closed
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ budgets: [{ category: '', amount: '' }] }}
        >
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: 'Please enter a city' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Hotel"
            name="hotel"
            rules={[{ required: true, message: 'Please enter a hotel' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select placeholder="Select a category" onChange={handleCategoryChange}>
              {categoryOptions}
            </Select>
          </Form.Item>
          <Form.List name="budgets">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Space key={field.key} align="baseline">
                    <Form.Item
                      name={[field.name, 'category']}
                      rules={[{ required: true, message: 'Please enter a category' }]}
                    >
                      <Input placeholder="Category" />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, 'amount']}
                      rules={[{ required: true, message: 'Please enter a budget amount' }]}
                    >
                      <InputNumber placeholder="Budget" style={{ width: '100%' }} />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()}>
                    <PlusOutlined /> Add Budget
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
}

export default ItemFormModal;
