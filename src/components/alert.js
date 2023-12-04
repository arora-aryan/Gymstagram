import React, { useState, useEffect } from 'react';

export const Alert = ({ text, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return (
    <>
      {isVisible && (
        <div
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '10px',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            textAlign: 'center',
          }}
        >
          {text}
        </div>
      )}
    </>
  );
};