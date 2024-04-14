import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Homepage from './Home';
import ComposePage from './Compose';
import InboxPage from './Inbox';
import InboxItem from './InboxItem'; 
import SentPage from './Sent';
import Validation from './Validation'
import Creation from './Creation'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='/compose' element={<ComposePage />} />
        <Route path='/inbox' element={<InboxPage />} />
        <Route path='/inbox/:id' element={<InboxItem />} /> 
        <Route path='/sent' element={<SentPage />} /> 
        <Route path='/validation' element={<Validation />} /> 
        <Route path='/creation' element={<Creation />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
