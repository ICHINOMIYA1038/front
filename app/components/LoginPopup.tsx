import React, { useState } from 'react';


const LoginPopup = ({ errorMessage, onClose }:any) => {
    return (
      <div className="popup">
        <h2>Please Login</h2>
        <p>{errorMessage}</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };

export default LoginPopup