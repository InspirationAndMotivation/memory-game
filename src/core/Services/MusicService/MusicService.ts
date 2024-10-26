// Default volume 10%
const volume = 0.1;

const playlist = [
  { name: 'song1', sound: new Audio('./sounds/Night_of_Mystery.m4a') },
  {
    name: 'song2',
    sound: new Audio('./sounds/Tam_Lin_Royalty_Fantasy_Music.m4a'),
  },
  { name: 'song3', sound: new Audio('./sounds/Night_of_Mystery.m4a') },
];

export const playSong = (songName: string) => {
  const song = playlist.find((song) => song.name === songName);
  if (song) {
    song.sound.volume = volume;
    song.sound.play();
  }
};
