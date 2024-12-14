import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Container = ({ camera, onDelete }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // 팝업 토글 함수
  const togglePopup = () => {
    setIsPopupVisible((prevState) => !prevState);
  };

  return (
    <div className="container">
      <button
        className="delete-button"
        onClick={() => onDelete(camera.id)} // 삭제 버튼 클릭 시 호출
      >
        &times;
      </button>
      <img
        src={`${camera.image}`}
        alt={`이미지 ${camera.id}`}
        className="camera-image"
      />
      <div className="camera-details">
        <a
          href={`https://search.danawa.com/dsearch.php?k1=${camera.model}`}
          target="_blank"
          rel="noreferrer"
          className="camera-title"
        >
          {`${camera.model} (${camera.brand})`}
        </a>
        <div
          className="camera-rating"
          style={{ position: 'absolute', top: '15px', left: '15px' }}
        >
          {[...Array(camera.rating)].map((_, index) => (
            <FaStar key={index} />
          ))}
        </div>
      </div>
      <button className="description-button" onClick={togglePopup}>
        {isPopupVisible ? '설명 닫기' : '설명 보기'}
      </button>
      {isPopupVisible && (
        <div className="camera-popup">
          <div className="popup-content">
            <button className="close-button" onClick={togglePopup}>
              &times;
            </button>
            <h2>{camera.model} 설명</h2>
            <p>{camera.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export { Container };
