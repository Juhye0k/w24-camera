import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    if (keyword.trim() !== '') {
      onSearch(keyword); 
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); 
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="검색어를 입력하세요"
        style={{
          width: '300px',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          marginRight: '10px',
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        검색
      </button>
    </div>
  );
};

export default SearchBar;