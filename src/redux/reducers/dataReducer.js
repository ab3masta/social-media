import { SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM, POST_SCREAM, SET_SCREAM } from '../types';
const initialState = {
    screams: [],
    scream: {},
    loading: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            };
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload,
                loading: false
            };
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex((scream) => scream.screamsId === action.payload.screamsId);
            state.screams[index] = action.payload;
            if (state.screams.screamsId === action.payload.screamsId) {
                state.scream = action.payload;
            }
            return {
                ...state,
            };
        case DELETE_SCREAM:
            let indexx = state.screams.findIndex((scream) => scream.screamsId === action.payload);
            state.screams.splice(indexx, 1);
            return {
                ...state
            };
        case POST_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            };
        default:
            return state;
    }
}