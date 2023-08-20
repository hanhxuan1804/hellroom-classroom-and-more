import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slice/authSlice';
import groupReducer from './slice/groupSlice';
import pathReducer from './slice/pathSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        groups: groupReducer,
        path: pathReducer,
    },
});


