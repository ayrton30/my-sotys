export const ADD_SOTY_TRACK = "ADD_SOTY_CATEGORY";
export const REMOVE_SOTY_TRACK = "REMOVE_SOTY_TRACK";
export const UP_TRACK = "UP_TRACK";
export const DOWN_TRACK = "DOWN_TRACK";

export const addTrack = (track) => ({
  type: ADD_SOTY_TRACK,
  payload: track,
});

export const removeTrack = (track) => ({
  type: REMOVE_SOTY_TRACK,
  payload: track,
});

export const moveUpTrack = (track) => ({
  type: UP_TRACK,
  payload: track,
});

export const moveDownTrack = (track) => ({
  type: DOWN_TRACK,
  payload: track,
});
