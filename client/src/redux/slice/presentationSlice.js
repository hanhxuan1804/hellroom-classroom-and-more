import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    presentations: [],
}

const presentationSlice = createSlice({
    name: 'presentations',
    initialState,
    reducers: {
        setPresentations: (state, action) => {
            state.presentations = action.payload;
        },
        addPresentation: (state, action) => {
            state.presentations.push(action.payload);
        },
        updatePresentation: (state, action) => {
            const index = state.presentations.findIndex(presentation => presentation._id === action.payload._id);
            if (index !== -1) {
                state.presentations[index] = action.payload;
            }
        },
        deletePresentation: (state, action) => {
            const index = state.presentations.findIndex(presentation => presentation._id === action.payload);
            if (index !== -1) {
                state.presentations.splice(index, 1);
            }
        }


    }
})

export const {setPresentations, addPresentation, updatePresentation, deletePresentation} = presentationSlice.actions;
export default presentationSlice.reducer;
