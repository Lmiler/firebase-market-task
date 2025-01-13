import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Expenses from './components/Expenses';
import CartPage from './components/CartPage';
import Buttons from './components/Buttons';
import './App.css'

function App() {
  

  return (
    <Router className="App">
        <Buttons />
       <Routes>
       <Route path="/" element={<Expenses />} />
         <Route path="/cart" element={<CartPage />} />
       </Routes>
    </Router>
  );
}

export default App;