import './AddUser.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

const AddUser = () => {
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
            const url = `${SERVER_BASE_URL}/users`;
            const response = await axios.post(url, user);
            if (response.status === 201) {
                navigate('/');
            }
        } catch (error) {
            console.error('Exception occurred in "handleSubmit" method. Error: ', error);
        }   
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <h4>Create User</h4>
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
