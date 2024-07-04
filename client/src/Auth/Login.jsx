import React from 'react'
import { Card, Flex, Form, Input, Typography, Button, Alert, Spin } from 'antd';
import { Link } from 'react-router-dom';
import loginImage from '../assets/login.png';


const Login = () => {

  const handleLogin = async (values) => {
    console.log(values);
  };
  return (
    <Card className='form-container'>
      <Flex gap="large" align='center'>
        {/* Image */}
        <Flex flex={1}>
          <img src={loginImage} className='auth-image' />
        </Flex>

        {/* <RegisterForm /> */}
        <Flex vertical flex={1}>
          <Typography.Title Level={3} strong className='title'>
            Sign In
          </Typography.Title>
          <Typography.Text type='secondary' strong className='slogan'>
            Unlock your world
          </Typography.Text>
          <Form
            layout='vertical'
            onFinish={handleLogin}
            autoComplete='off'
          >
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
            

            {/* {error && (
              <Alert
                description={error}
                type="error"
                showIcon
                closable
                className="alert"
              />
            )} */}
            <Form.Item>
              <Button
                // type={${loading ? '' : 'primary'}}
                htmlType='submit'
                size='large'
                className='btn'
              >
                {/* {{loading ? '<Spin />' : 'Create Account'}} */}
                Sign In
              </Button>
            </Form.Item>
            <Form.Item>
              <Link to='/'>
                <Button size='large' className='btn'>Create Account</Button>
              </Link>
            </Form.Item>
          </Form>

        </Flex>
      </Flex>
    </Card>
  );
}

export default Login