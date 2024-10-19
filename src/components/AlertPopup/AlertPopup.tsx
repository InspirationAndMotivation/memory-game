import React from 'react';
import './AlertPopup.scss';

const AlertPopup = (props: { title: string; text: string }) => {
  const { title, text } = props;

  return (
    <div className="Alert-Popup">
      <h1>{title}</h1>
      <p>{text}</p>
      <div className="Setting"></div>
    </div>
  );
};

export default AlertPopup;
