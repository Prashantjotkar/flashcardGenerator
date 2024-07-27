import React, { useState, useEffect } from 'react';

const Alert = ({ type, message }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    },4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showAlert && (
        <div className={`bg-${type}-500 text-stone-950 w-2/5 mt-14 h-10 right-5 rounded font-bold px-4 py-2 fixed top-0`}>
          <p className='ml-auto'>{message}</p>
        </div>
       )} 
    </>
  );
};

export default Alert;
