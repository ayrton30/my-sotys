import React, { useContext } from "react";
import { FlatList } from "react-native";
import { TracksContext } from "../context/TracksContext";
import { Track } from "../Track/Track";

export const TrackSoty = () => {
  const { sotyTracks } = useContext(TracksContext);
  return (
    <FlatList
      data={sotyTracks}
      renderItem={(item) => <Track track={item.item} />}
      keyExtractor={(item) => item.id}
    />
  );
};
