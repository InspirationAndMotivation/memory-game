import React, { RefObject, useContext, useEffect, useRef } from 'react';
import './AudioPlayer.scss';
import { playSong } from '../../core/Services/MusicService/MusicService';
import GameContext from '../../core/Contexts/GameContext';

const AudioPlayer = (props: { audioRef: RefObject<HTMLAudioElement> }) => {
  const { isMusic } = useContext(GameContext);
  const audioRef = props;

  useEffect(() => {
    // audioRef.audioRef.current?.muted = !isMusic;
    audioRef.audioRef.current?.play();
  }, []);

  // useEffect(() => {
  //   audioRef.audioRef.current.volume = volume;
  // }, [audioRef]);

  useEffect(() => {
    console.log('VOLUME FROM PLAYER');
    console.log(audioRef.audioRef.current?.volume);
  });

  return (
    <div className="Audio-Player">
      <iframe
        src="sounds/silence.mp3"
        allow="autoplay"
        id="audio"
        style={{ display: 'none' }}
      ></iframe>
      <audio
        ref={audioRef.audioRef}
        muted={!isMusic}
        id="AutoPlayer"
        autoPlay
        loop
        src="sounds/Night_of_Mystery.m4a"
      >
        <source src="sounds/Night_of_Mystery.m4a" type="audio/mp3" />
      </audio>
    </div>
  );
};

export default AudioPlayer;
