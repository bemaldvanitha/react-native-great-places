import * as FileSystem from 'expo-file-system';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

import {insertPlace,fetchPlaces} from '../../helpers/db';

export const addPlace = (title,image,lat,lng) => {
    return async dispatch => {
        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory+fileName;
        
        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await insertPlace(title,newPath,'dummy address',lat,lng);
            //console.log(dbResult);

            dispatch({
                type: ADD_PLACE,
                payload: {id: dbResult.insertId,title: title, image: newPath,lat: lat,lng: lng}
            });

        }catch (err) {
            console.log(err);
            throw err;
        }
    }
};

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();
            //console.log(dbResult);
            dispatch({ type: SET_PLACES, payload: dbResult.rows._array });
        } catch (err) {
            throw err;
        }
    };
};