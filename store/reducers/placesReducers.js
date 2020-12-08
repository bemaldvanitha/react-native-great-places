import {ADD_PLACE,SET_PLACES} from '../actions/placesAction';
import Places from '../../models/places';

const initialState = {
  places: []
};

const placesReducer = (state = initialState , action) => {
    switch (action.type) {
        case SET_PLACES:
            return {
                places: action.payload.map(pl => new Places(pl.id.toString(),pl.title,pl.imageUri,pl.lat,pl.lng))
            };
        case ADD_PLACE:
            const newPlace = new Places(action.payload.id.toString() , action.payload.title,action.payload.image,action.payload.lat,action.payload.lng);
            return {
              ...state,
              places: state.places.concat(newPlace)
            };
        default:
            return state;
    }
};

export default placesReducer;