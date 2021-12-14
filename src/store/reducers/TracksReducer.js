import { getPositionTrack } from "../../utils/getPositionTrack";
import {
  ADD_SOTY_TRACK,
  DOWN_TRACK,
  REMOVE_SOTY_TRACK,
  UP_TRACK,
} from "../actions/TrackAction";

const initialState = {
  //canciones seleccionadas por el usuario como mejores del año
  sotyTracks: [],
};

const TracksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SOTY_TRACK:
      //si no existe ninguna cancion con el mismo id
      //puedo agregarla a mis sotys
      if (!state.sotyTracks.some((fig) => fig.id === action.payload.id)) {
        return {
          ...state,
          sotyTracks: [...state.sotyTracks, action.payload],
        };
      } else {
        return state;
      }
    case REMOVE_SOTY_TRACK:
      return {
        sotyTracks: state.sotyTracks.filter(
          (fig) => fig.id !== action.payload.id
        ),
      };

    case UP_TRACK:
      //position: posicion en la lista de soty (1er lugar, 2do lugar, ..., n lugar)
      //index: indice del track en el arreglo de canciones guardadas como soty
      let indexUp = getPositionTrack(state.sotyTracks, action.payload) - 1;

      if (indexUp > 0) {
        let newTracks = [...state.sotyTracks];
        const el = newTracks[indexUp];
        newTracks[indexUp] = newTracks[indexUp - 1];
        newTracks[indexUp - 1] = el;

        return {
          ...state,
          sotyTracks: newTracks,
        };
      } else {
        return state;
      }

    case DOWN_TRACK:
      let indexDown = getPositionTrack(state.sotyTracks, action.payload) - 1;

      if (indexDown < state.sotyTracks.length - 1) {
        let newTracks = [...state.sotyTracks];
        const el = newTracks[indexDown];
        newTracks[indexDown] = newTracks[indexDown + 1];
        newTracks[indexDown + 1] = el;

        return {
          ...state,
          sotyTracks: newTracks,
        };
      } else {
        return state;
      }

    default:
      return state;
  }
};

export default TracksReducer;
