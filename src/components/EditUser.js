import './AddEditUser.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

const AddUser = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        dob: ''
    });
    const [dob, setDob] = useState(null);

    // Handle form field change
    const handleFieldChange = (e) => {
        try {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        } catch (error) {
            console.error('Exception occurred in "handleFieldChange" method. Error: ', error);
        }
    };

    // Handle dob change
    const handleDOBChange = (date) => {
        try {
            setDob(date);
            const timestamp = date.getTime();
            setFormData({ ...formData, dob: timestamp });
        } catch (error) {
            console.error('Exception occurred in "handleSinceChange" method. Error: ', error);
        }
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let user = formData;
            const url = `${SERVER_BASE_URL}/users/${id}`;
            const response = await axios.put(url, user);
            if (response.status === 200) {
                alert('User updated successfully!');
                navigate('/');
            }
        } catch (error) {
            console.error('Exception occurred in "handleSubmit" method. Error: ', error);
            alert('Failed to update user!');
        }   
    };

    // Fetch user data
    const fetchUser = async () => {
        try {
            const url = `${SERVER_BASE_URL}/users/${id}`;
            const response = await axios.get(url);
            if (response && response.status === 200) {
                const user = response.data.data;
                setFormData({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    dob: user.dob
                });

                setDob(new Date(user.dob));
            } else {
                console.error('Failed to fetch user from server! Response:', response);
            }
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    };

    // Use effect hooks
    useEffect(() => {
        if (!formData || !dob) {
            fetchUser();
        }
    });

    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <h4>Edit User</h4>
                <div className="form-group">
                    <label htmlFor="dobDatePicker">Name: </label>
                    <input
                        className='input-field'
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleFieldChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dobDatePicker">Email: </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleFieldChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dobDatePicker">Password: </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleFieldChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dobDatePicker">DOB: </label>
                    <DatePicker
                        id="dobDatePicker"
                        selected={dob}
                        onChange={handleDOBChange}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="Select DOB date"
                        required
                    />
                </div>
                <button className="submit-btn" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddUser;
