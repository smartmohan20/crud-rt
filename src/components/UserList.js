import './UserList.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

const UserList = () => {
    const [users, setUsers] = useState([]);

    // Load users
    const loadUsers = async () => {
        try {
            const url = `${SERVER_BASE_URL}/users`;
            const response = await axios.get(url);
            if (response && response?.status === 200) {
                const users = response?.data?.data;
                setUsers(users);
            } else {
                console.error('Failed to load users from server! Response:', response);
            }
        } catch (error) {
            console.error('Failed to load users:', error);
        }
    };

    // Delete a user
    const deleteUser = async (id) => {
        try {
            const url = `${SERVER_BASE_URL}/users/${id}`;
            const response = await axios.delete(url);
            if (response && response.status === 200) {
                loadUsers();
            } else {
                console.error('Failed to delete user from server! Response:', response);
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    // Use effect hooks
    useEffect(() => {
        loadUsers();
    }, []); // Run only once when the component is mounted

    return (
        <div className="user-list"> {/* Add the user-list class */}
            <h2>User List</h2>
            <Link to="/add">
                <button className='add-user-btn'>Add User</button>
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}> {/* Apply even and odd row classes */}
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link to={`/edit/${user.id}`}>
                                    <button className='action-btn'>Edit</button>
                                </Link>
                                <button className='action-btn'onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
