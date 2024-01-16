import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import Home from './components/Home';
import Page2 from './components/Page2';

import { Route, Routes } from 'react-router-dom';





function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar bg="light" variant="light" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/vite.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            MedStart
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/page2' element={<Page2 />} />


      </Routes>

    </div>
  )
}

export default App
