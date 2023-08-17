import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slice/authSlice';
import groupReducer from './slice/groupSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        groups: groupReducer,
    },
});


