import React, { useEffect } from 'react';
import './AudioPlayer.scss';
// import sound from '../../../public/sound/Night_of_Mystery.m4a';

const AudioPlayer = () => {
  const music = new Audio('./sounds/Night_of_Mystery.m4a');

  const play = () => {
    music.play();
  };

  //   useEffect(() => {
  //     play();
  //   }, []);

  return (
    <div className="Audio-Player">
      <div onClick={play}>Play</div>
      {/* <audio id="audio" loop autoPlay>
        <source src="music.mp3" type="audio/mpeg" />
      </audio> */}
      <div className="Setting"></div>
    </div>
  );
};

export default AudioPlayer;
