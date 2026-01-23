import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '/src/pages/Home';
import { Layout } from './pages/Layout';
import Deshboad from './pages/Deshboad';
import Resumebuilder from './pages/Resumebuilder';
import Preview from './pages/Preview';
import Login from './pages/Login';

const App = () => {
  return (

    <Routes>
      <Route path="/" element={<Home />} />

      <Route path='App' element={<Layout />}>
        <Route index element={<Deshboad />} />
        <Route path='Builder/:ResumeId' element={<Resumebuilder />} />

      </Route>
      <Route path='view/:ResumeId' element={<Preview />}/>
      <Route path='Login' element={<Login />}/>
    </Routes>

  );
};

export default App;
