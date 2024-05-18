import './App.css';
import React from 'react';
import { HashRouter as Router, Routes, Route, Outlet, useNavigate, Link } from 'react-router-dom';
import UserList from './components/UserList';
import AddUser from './components/AddUser';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/add" element={<AddUser/>} />
            </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
