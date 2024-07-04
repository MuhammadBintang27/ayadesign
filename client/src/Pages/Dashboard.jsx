import React from 'react'
import { Avatar, Button, Card, Typography, Flex } from 'antd'
import { useAuth } from '../contexts/AuthContext'
import { UserOutlined } from '@ant-design/icons'

const Dashboard = () => {
  const { userData,logout } =useAuth()
  const handleLogout = async() => {
    await logout()
  }
  return (
    <Card className='profile-card'>
      <Flex vertical gap="small" align='center'>
        <Avatar size={150} icon={<UserOutlined />} className='avatar'/>
        <Typography.Title level={2} className='title'>{userData.name}</Typography.Title>
        <Typography.Text type='secondary'>{userData.email}</Typography.Text>
        <Typography.Text type='secondary'>{userData.role}</Typography.Text>
        <Button onClick={handleLogout} size='large' type='primary' className='profile-btn' >Logout</Button>
      </Flex>
      
      
    </Card>
  )
}

export default Dashboard