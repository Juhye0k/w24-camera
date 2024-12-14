import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Container } from './Container.js';
import SearchBar from './SearchBar.js';
const SERVER_URL = 'http://localhost:8080/api/songs';

const App = () => {
  const [camera, setCamera] = useState([]); 

  const getCamera = async () => {
    try {
      const res = await axios.get(SERVER_URL);
      console.log(res);
      setCamera(res.data); 
    } catch (err) {
      console.log(err);
      setCamera([]);
    }
  };

  useEffect(() => {
    getCamera(); 
  }, []);

  const deleteCamera = async (id) => {
    try {
      await axios.delete(`${SERVER_URL}/${id}`);
      setCamera((prev) => prev.filter((camera) => camera.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const searchCamera = async (model) => {
    try {
      const res = await axios.get(`${SERVER_URL}/${model}`);
      setCamera(res.data ? [res.data] : []);
    } catch (err) {
      console.log(err);
      setCamera([]);
    }
  };

  return (
    <div className="App">
      <Header />
      <SearchBar onSearch={searchCamera} />
      <CameraList listCamera={camera} onDelete={deleteCamera} />
    </div>
  );
};

const Header = () => {
  return (
    <header className="header">
      <h1>카메라 검색 및 등록 웹사이트</h1>
    </header>
  );
};

const CameraList = ({ listCamera, onDelete }) => {
  return (
    <div className="camera-list" style={{ textAlign: 'center' }}>
      <div className="grid-layout">
        {listCamera.map((camera) => (
          <Container key={camera.id} camera={camera} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default App;
