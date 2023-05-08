import React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, InputNumber, DatePicker, Space, Select } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CATEGORIES} from '../utils/queries';
import {ADD_ITEM, ADD_BUDGET} from '../utils/mutations';
import moment from 'moment';


const { Option } = Select;


function ItemFormModal({ handleSubmit }) {
  const [visible, setVisible] = useState(false); // state to control the visibility of the modal
  const [form] = Form.useForm();
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const [categories, setCategories] = useState([]);
  const [addItem] = useMutation(ADD_ITEM);
  const [addBudget] = useMutation(ADD_BUDGET);

  const categoryOptions = categories.map((category) => (
    <Option key={category._id} value={category.name}>
      {category.name}
    </Option>
  ));

//this shows categories in drop down
  useEffect(() => {
    if (!loading && !error) {
      setCategories(data.categories);
    }
  }, [data, loading, error]);



  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const { date } = values;
      const dateString = moment(date).format('YYYY-MM-DD');
      const budgetData = values.budgets.map((budget) => ({
        category: budget.category,
        amount: budget.amount,
      }));
      const itemData = {
        date: dateString,
        city: values.city,
        hotel: values.hotel,
        details: values.details,
        budget: budgetData,
      };
      const { data: { addItem: newItem } } = await addItem({ variables: { item: itemData } });
      console.log(itemData);

      const { data: { addBudget: newBudget } } = await addBudget({ variables: { budget: budgetData } });
      console.log(budgetData);
      handleSubmit({ item: newItem, budgetId: newBudget._id }); // pass the budgetId to the handleSubmit function
      form.resetFields();
      setVisible(false);
    } catch (error) {
      console.error('Error in addItem Function', error);
    }
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
            <DatePicker format ="YYYY-MM-DD" style={{ width: '100%' }} />
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
            label="Detils"
            name="details"
            rules={[{ required: true, message: 'Please enter a details' }]}
          >
            <Input />
          </Form.Item>
         
          <Form.List name="budgets">
  {(fields, { add, remove }) => (
    <>
      {fields.map((field, index) => (
        <Space key={field.key} align="baseline">
          <Form.Item
            {...field}
            name={[field.name, 'category']}
            key={[field.key, 'category']}
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select placeholder="Select a category" onChange={handleCategoryChange}>
              {categoryOptions}
            </Select>
          </Form.Item>
          <Form.Item
            {...field}
            name={[field.name, 'amount']}
            key={[field.key, 'amount']}
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
