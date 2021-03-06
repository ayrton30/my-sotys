import React, { createContext, useState } from "react";

export const TracksContext = createContext();

export const TracksProvider = ({ children }) => {
  //canciones seleccionadas por el usuario
  const [sotyTracks, setSotyTracks] = useState([]);

  const addTrack = (track) => {
    //si no existe ninguna cancion con el mismo id
    //puedo agregarla a mis sotys
    if (!sotyTracks.some((fig) => fig.id === track.id)) {
      setSotyTracks([...sotyTracks, track]);
    }
  };

  const removeTrack = (track) => {
    setSotyTracks(sotyTracks.filter((fig) => fig.id !== track.id));
  };

  const trackPosition = (track) => {
    const position = sotyTracks.findIndex((item) => item.id === track.id) + 1;
    return position;
  };

  return (
    <TracksContext.Provider
      value={{ sotyTracks, addTrack, trackPosition, removeTrack }}
    >
      {children}
    </TracksContext.Provider>
  );
};
