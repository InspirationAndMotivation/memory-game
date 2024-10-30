// Default volume 25%
const volume = 0.25;

const sounds = [
  { name: 'matched', sound: new Audio('./sounds/matched.m4a') },
  { name: 'win', sound: new Audio('./sounds/win.m4a') },
  { name: 'lose', sound: new Audio('./sounds/lose.m4a') },
  { name: 'timer', sound: new Audio('./sounds/timer.m4a') },
  { name: 'flip1', sound: new Audio('./sounds/flip.m4a') },
  { name: 'flip2', sound: new Audio('./sounds/flip.m4a') },
  { name: 'wrongchoice', sound: new Audio('./sounds/wrongchoice.m4a') },
];

export const play = (soundName: string) => {
  playSound(sounds.find((snd) => snd.name === soundName)?.sound);
};

export const playSound = (sound: HTMLAudioElement | undefined) => {
  if (sound) {
    sound.volume = volume;
    sound.play();
  }
};
