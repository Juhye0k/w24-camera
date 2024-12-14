import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './AddCameraForm.css';
import { Container } from './Container.js';
import SearchBar from './SearchBar.js';
import AddCameraForm from './AddCameraForm.js';

const SERVER_URL = 'http://localhost:8080/api/songs';

const App = () => {
  const [camera, setCamera] = useState([]);
  const [isAddFormVisible, setAddFormVisible] = useState(false); 

 
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

  
  const addCamera = async (newCamera) => {
    try {
      const res = await axios.post(SERVER_URL, newCamera); 
      console.log(res.data);
      setCamera((prev) => [...prev, res.data]); 
      setAddFormVisible(false); 
    } catch (err) {
      console.log(err);
    }
  };

  
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
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => setAddFormVisible(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          등록하기
        </button>
      </div>
      <SearchBar onSearch={searchCamera} />
      <CameraList listCamera={camera} onDelete={deleteCamera} />
      {isAddFormVisible && <AddCameraForm onAddCamera={addCamera} onClose={() => setAddFormVisible(false)} />}
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
