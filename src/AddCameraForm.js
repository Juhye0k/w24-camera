import React, { useState } from 'react';
import './AddCameraForm.css'; 
import { FaCamera, FaImage, FaStar, FaStickyNote } from 'react-icons/fa'; 

const AddCameraForm = ({ onAddCamera, onClose }) => {
  const [newCamera, setNewCamera] = useState({
    model: '',
    brand: '',
    rating: 0,
    image: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCamera((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCamera(newCamera); 
    setNewCamera({ model: '', brand: '', rating: 0, image: '', description: '' }); 
  };

  return (
    <div className="add-camera-overlay">
      <div className="add-camera-form">
        <h2>카메라 등록</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaCamera />
            <input
              type="text"
              name="model"
              value={newCamera.model}
              onChange={handleChange}
              placeholder="모델명"
              required
            />
          </div>
          <div className="input-group">
            <FaStickyNote />
            <input
              type="text"
              name="brand"
              value={newCamera.brand}
              onChange={handleChange}
              placeholder="브랜드"
              required
            />
          </div>
          <div className="input-group">
            <FaStar />
            <input
              type="number"
              name="rating"
              value={newCamera.rating}
              onChange={handleChange}
              placeholder="별점 (1~5)"
              min="1"
              max="5"
              required
            />
          </div>
          <div className="input-group">
            <FaImage />
            <input
              type="text"
              name="image"
              value={newCamera.image}
              onChange={handleChange}
              placeholder="이미지 URL"
            />
          </div>
          <div className="input-group">
            <FaStickyNote />
            <textarea
              name="description"
              value={newCamera.description}
              onChange={handleChange}
              placeholder="설명"
              required
            ></textarea>
          </div>
          <button type="submit">등록</button>
          <button
            type="button"
            onClick={onClose}
            style={{ backgroundColor: '#d3d3d3', marginTop: '10px' }}
          >
            닫기
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCameraForm;
