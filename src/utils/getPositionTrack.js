export const getPositionTrack = (tracks, track) => {
  const position = tracks.findIndex((item) => item.id === track.id) + 1;
  return position;
};
