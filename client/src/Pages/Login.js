import { Button, Form, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';


function Login() {

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

  return (
    <div className='LoginForm'>
        <h1>Login</h1>
      <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
    >

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
            <span>
            <Link to='/register'>  Click here to Register</Link>
            </span>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;