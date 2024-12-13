import React from 'react';
import {useState,useEffect} from 'react'
import axios from 'axios'
import './App.css';
import { Container } from './Container.js';

const SERVER_URL = 'http://localhost:8080/api/songs'
const App = () => {
  const [camera,setCamera]=useState([])

  const getCamera = async()=>{
    try{
      const res=await axios.get(SERVER_URL)
      console.log(res)
      setCamera(res.data)
    }catch(err){
      console.log(err)
      setCamera([])
    }
  }

  useEffect(()=>{
    getCamera()
  },[])

  return (
    <div className="App">
      <Header />
      <CameraList title="다나와에서 검색해보고 싶은 카메라 목록" listCamera={camera} />
    </div>
  );
};

const Header = () => {
  return (
    <header className="header">
      <h1>카메라 검색 웹사이트</h1>
    </header>
  );
};

const CameraList = (props) => {
  return (
    <div className="camera-list" style={{ textAlign: 'center' }}>
      <h2 style={{ textAlign: 'center' }}>{props.title}</h2>
      <div className="grid-layout">
        {props.listCamera.map((camera) => (
          <Container key={camera.id} camera={camera} />
        ))}
      </div>
    </div>
  );
};

export default App;
