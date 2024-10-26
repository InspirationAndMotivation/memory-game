import React, { RefObject, useContext, useEffect, useState } from 'react';
import './AudioPlayer.scss';
import GameContext from '../../core/Contexts/GameContext';

const AudioPlayer = (props: { audioRef: RefObject<HTMLAudioElement> }) => {
  const { isMusic } = useContext(GameContext);
  const [isMusicStarted, setIsMusicStarted] = useState<boolean>(false);
  const audioRef = props;

  useEffect(() => {
    document.body.addEventListener('click', () => {
      if (!isMusicStarted) {
        audioRef.audioRef.current?.play();
        setIsMusicStarted(true);
      }
    });
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   console.log('VOLUME FROM PLAYER');
  //   console.log(audioRef.audioRef.current?.volume);
  // }, [audioRef.audioRef.current?.volume]);

  return (
    <div className="Audio-Player">
      <iframe
        src="sounds/silence.m4a"
        allow="autoplay"
        id="audio"
        style={{ display: 'none' }}
        title="silence"
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
