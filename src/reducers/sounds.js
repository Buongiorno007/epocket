export const SET_SOUNDS = "sounds/SET_SOUNDS";
var Sound = require("react-native-sound");

export default (state = [{}, {}], action) => {
  switch (action.type) {
    case SET_SOUNDS:
      return action.sounds;
    default:
      return state;
  }
};
export const setSounds = () => {
  let sounds = [];
  Sound.setCategory("Playback");
  let clock_tick = new Sound("clock_tick.wav", Sound.MAIN_BUNDLE, error => {
    if (error) {
      // console.log("failed to load the sound", error);
      return;
    }
    //console.log('duration in seconds: ' + clock_tick.getDuration() + 'number of channels: ' + clock_tick.getNumberOfChannels());
  });
  let quest_complete = new Sound(
    "quest_complete.mp3",
    Sound.MAIN_BUNDLE,
    error => {
      if (error) {
        // console.log("failed to load the sound", error);
        return;
      }
      //console.log('duration in seconds: ' + clock_tick.getDuration() + 'number of channels: ' + clock_tick.getNumberOfChannels());
    }
  );
  let quest_fail = new Sound("quest_fail.wav", Sound.MAIN_BUNDLE, error => {
    if (error) {
      // console.log("failed to load the sound", error);
      return;
    }
    //console.log('duration in seconds: ' + clock_tick.getDuration() + 'number of channels: ' + clock_tick.getNumberOfChannels());
  });
  sounds.push(clock_tick);
  sounds.push(quest_complete);
  sounds.push(quest_fail);
  return {
    type: SET_SOUNDS,
    sounds
  };
};
export const playClock = clock_tick => async dispatch => {
  clock_tick.play(success => {
    if (success) {
      // console.log("successfully finished playing");
    } else {
      // console.log("playback failed due to audio decoding errors");
      // reset the player to its uninitialized state (android only)
      // this is the only option to recover after an error occured and use the player again
      clock_tick.reset();
    }
  });
};
export const playQuestComplete = quest_complete => async dispatch => {
  quest_complete.play(success => {
    if (success) {
      // console.log("successfully finished playing");
    } else {
      // console.log("playback failed due to audio decoding errors");
      // reset the player to its uninitialized state (android only)
      // this is the only option to recover after an error occured and use the player again
      quest_complete.reset();
    }
  });
};
export const playQuestFail = quest_fail => async dispatch => {
  quest_fail.play(success => {
    if (success) {
      // console.log("successfully finished playing");
    } else {
      // console.log("playback failed due to audio decoding errors");
      quest_fail.reset();
    }
  });
};
export const stopClock = clock_tick => async dispatch => {
  clock_tick.stop(() => {
    // Note: If you want to play a sound after stopping and rewinding it,
    // it is important to call play() in a callback.
  });
};
