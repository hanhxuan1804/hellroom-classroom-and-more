import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    groups: [], 
    loading: true,
};

const groupSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {
        setGroups: (state, action) => {
            state.loading = true;
            state.groups = action.payload;
            state.loading = false;
        },
        addGroup: (state, action) => {
            state.loading = true;
            state.groups.push(action.payload);
            state.loading = false;
        },
        updateGroup: (state, action) => {
            state.loading = true;
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
            state.loading = false;
        },
        deleteGroup: (state, action) => {
            state.loading = true;
            const id = action.payload;
            state.groups = state.groups.filter((group) => group._id !== id);
            state.loading = false;
        },
        clearGroups: (state) => {
            state.loading = true;
            state.groups = [];
            state.loading = false;
        }

    }
});

export const { setGroups, addGroup, updateGroup, deleteGroup , clearGroups} = groupSlice.actions;
export default groupSlice.reducer;

