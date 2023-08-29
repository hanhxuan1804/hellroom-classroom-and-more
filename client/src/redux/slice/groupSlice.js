import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    groups: [], 
};

const groupSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {
        setGroups: (state, action) => {
            state.groups = action.payload;
        },
        addGroup: (state, action) => {
            state.groups.push(action.payload);
        },
        updateGroup: (state, action) => {
            const { _id, name, description, background } = action.payload;
            const existingGroup = state.groups.find((group) => group._id === _id);
            if (existingGroup) {
                existingGroup.name = name;
                existingGroup.description = description;
                existingGroup.background = background;
            }
            else {
                state.groups.push(action.payload);
            }
        },
        deleteGroup: (state, action) => {
            const id = action.payload;
            state.groups = state.groups.filter((group) => group._id !== id);
        },
        clearGroups: (state) => {
            state.groups = [];
        }

    }
});

export const { setGroups, addGroup, updateGroup, deleteGroup , clearGroups} = groupSlice.actions;
export default groupSlice.reducer;

