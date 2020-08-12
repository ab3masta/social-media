import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM } from '../types';
import axios from 'axios';

//Get all Screams
export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/screams').then(res => {
        dispatch({
            type: SET_SCREAMS,
            payload: res.data
        });
    }).catch(error => {
        dispatch({
            type: SET_SCREAMS,
            payload: []
        });
    });
}
//Like a scream
export const likeScream = (screamsId) => (dispatch) => {
    axios.get(`/scream/${screamsId}/like`).then(res => {
        dispatch({
            type: LIKE_SCREAM,
            payload: res.data
        });
    }).catch(error => {
        console.log(error);
    });
};
//Unlike a scream
export const unlikeScream = (screamsId) => (dispatch) => {
    axios.get(`/scream/${screamsId}/unlike`).then(res => {
        dispatch({
            type: UNLIKE_SCREAM,
            payload: res.data
        });
    }).catch(error => {
        console.log(error);
    });
};