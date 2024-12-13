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
  const [isAddFormVisible, setAddFormVisible] = useState(false); // 등록 폼 표시 여부

  // 카메라 목록 가져오기
  const getCamera = async () => {
    try {
      const res = await axios.get(SERVER_URL);
      console.log(res);
      setCamera(res.data); // 기존 카메라 리스트 설정
    } catch (err) {
      console.log(err);
      setCamera([]);
    }
  };

  useEffect(() => {
    getCamera(); // 컴포넌트가 마운트될 때 데이터 가져오기
  }, []);

  // 카메라 추가
  const addCamera = async (newCamera) => {
    try {
      const res = await axios.post(SERVER_URL, newCamera); // POST 요청으로 새 카메라 추가
      console.log(res.data);
      setCamera((prev) => [...prev, res.data]); // 새 데이터를 기존 상태에 추가
      setAddFormVisible(false); // 등록 폼 닫기
    } catch (err) {
      console.log(err);
    }
  };

  // 카메라 삭제
  const deleteCamera = async (id) => {
    try {
      await axios.delete(`${SERVER_URL}/${id}`);
      setCamera((prev) => prev.filter((camera) => camera.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // 카메라 검색
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
