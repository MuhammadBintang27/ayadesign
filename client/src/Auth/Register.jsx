import React from 'react';
import { Card, Flex, Form, Input, Typography, Button, Alert, Spin } from 'antd';
import { Link } from 'react-router-dom';
import registerImage from '../assets/register.png';
import useSignUp from '../hooks/useSignUp';

export const Register = () => {
  const { loading, error, registerUser } = useSignUp();
  const handleRegister = (values) => {
    registerUser(values);
  };

  return (
    <Card className='form-container'>
      <Flex gap="large" align='center'>
        {/* <RegisterForm /> */}
        <Flex vertical flex={1}>
          <Typography.Title Level={3} strong className='title'>
            Create an account
          </Typography.Title>
          <Typography.Text type='secondary' strong className='slogan'>
            Join for exclusive access!
          </Typography.Text>
          <Form
            layout='vertical'
            onFinish={handleRegister}
            autoComplete='off'
          >
            <Form.Item
              label='Full Name'
              name='name'
              rules={[
                {
                  required: true,
                  message: 'Please input your full name'
                }
              ]}
            >
              <Input placeholder='Enter your full name' />
            </Form.Item>
            <Form.Item
              label='Email'
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Please input your email'
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email'
                }
              ]}
            >
              <Input placeholder='Enter your email' />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password'
                }
              ]}
            >
              <Input.Password size='large' placeholder='Enter your password' />
            </Form.Item>
            <Form.Item
              label='Password'
              name='passwordConfirm'
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password'
                }
              ]}
            >
              <Input.Password size='large' placeholder='Re-enter your password' />
            </Form.Item>

            {error && (
              <Alert
                description={error}
                type="error"
                showIcon
                closable
                className="alert"
              />
            )}
            <Form.Item>
              <Button
                type={`${loading ? '' : 'primary'}`}
                htmlType='submit'
                size='large'
                className='btn'
              >
                {loading ? <Spin /> : 'Create Account'}
              </Button>
            </Form.Item>
            <Form.Item>
              <Link to='/login'>
                <Button size='large' className='btn'>Sign In</Button>
              </Link>
            </Form.Item>
          </Form>

        </Flex>
        {/* Image */}
        <Flex flex={1}>
          <img src={registerImage} className='auth-image' />
        </Flex>
      </Flex>
    </Card>
  );
};

export default Register;
