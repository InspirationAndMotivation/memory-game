import React, { useEffect } from 'react';
import './AudioPlayer.scss';
import { playSong } from '../../core/Services/MusicService/MusicService';

const AudioPlayer = () => {
  const play = () => {
    playSong('song1');
  };

  // useEffect(() => {
  //   play();
  // }, []);

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
