import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import Summary from './components/Summary';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/summary" element={<Summary />} />
    </Routes>
  </Router>
);

export default App;