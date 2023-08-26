import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slice/authSlice';
import groupReducer from './slice/groupSlice';
import pathReducer from './slice/pathSlice';
import presentationReducer from './slice/presentationSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        groups: groupReducer,
        path: pathReducer,
        presentations: presentationReducer,
    },
});


