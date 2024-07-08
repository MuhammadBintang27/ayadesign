// ProfileModal.js
import React, { useState } from 'react';
import { Modal, Card, Typography, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';

// ProfileModal.js

const ProfileModal = ({ visible,    handleClose }) => {
    const { userData, logout, isAuthenticated } = useAuth();
    console.log(userData);


    const handleLogout = async () => {
        await logout();
        handleClose(); // Tutup modal setelah logout
    };

    if (!isAuthenticated || !userData) {
        return null;
    }

    return (
        <Modal visible={visible} onCancel={handleClose} footer={null}>
            <div className="flex flex-col items-center gap-2 p-4">
                <div className="bg-gray-200 rounded-full w-36 h-36 flex items-center justify-center mb-4">
                    {userData.image && userData.image.url ? (
                        <img src={userData.image.url} alt="Profile" className="rounded-full object-cover w-full h-full" />
                    ) : (
                        <UserOutlined className="text-6xl" />
                    )}
                </div>
                <h2 className="text-2xl font-semibold">{userData.name}</h2>
                <p className="text-gray-600">{userData.email}</p>
                <p className="text-gray-600">{userData.role}</p>
                <Button onClick={handleLogout} size="large" type="primary" className="mt-4">
                    Logout
                </Button>
            </div>
        </Modal>
    );
};

export default ProfileModal;
