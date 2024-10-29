import React, { RefObject, useContext, useEffect, useState } from 'react';
import GameContext from '../../core/Contexts/GameContext';
import './AudioPlayer.scss';

const playlist = [
  { songName: 'sounds/Tam_Lin_Royalty_Fantasy_Music.m4a' },
  { songName: 'sounds/Night_of_Mystery.m4a' },
  { songName: 'sounds/Adventure_Beyond.m4a' },
  { songName: 'sounds/Children_of_the_Forest.m4a' },
  { songName: 'sounds/Enchanted_Echoes.m4a' },
];

const defaultSong = playlist[1];

const AudioPlayer = (props: { audioRef: RefObject<HTMLAudioElement> }) => {
  const { isMusic } = useContext(GameContext);
  const [isMusicStarted, setIsMusicStarted] = useState<boolean>(false);
  const [playingSong, setPlayingSong] = useState<string>(defaultSong.songName);
  const audioRef = props;

  const randomTrack = () => {
    const song = [...playlist]
      .sort(() => Math.random() - 0.7)
      .find((song) => ({ ...song, id: Math.random() }));

    if (song) return song.songName;
    else return defaultSong.songName;
  };

  useEffect(() => {
    document.body.addEventListener('click', () => {
      if (!isMusicStarted) {
        audioRef.audioRef.current?.play();
        setIsMusicStarted(true);
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setPlayingSong(randomTrack);
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
        src={playingSong}
      >
        <source src={playingSong} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default AudioPlayer;
