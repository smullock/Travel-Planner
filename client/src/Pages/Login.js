import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Form, Input, Button, Alert } from 'antd';
import Auth from '../utils/auth';

const Login = (props) => {
  const [form] = Form.useForm();
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // submit form
  const handleFormSubmit = async (values) => {
    console.log(values);
    try {
      const { data } = await login({
        variables: { ...values },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Login</h4>
          <div className="card-body">
            {data ? (
              <Alert message="Success! You may now head back to the homepage." type="success" />
            ) : (
              <Form form={form} onFinish={handleFormSubmit}>
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input placeholder="Your email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password placeholder="******" />
                </Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </Form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
            <div className="mt-2">
              Don't have an account?{' '}
              <Link to="/signup">Signup</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
