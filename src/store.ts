import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import filtersReducer from './features/sidebar/filtersSlice';
import todosReducer from './features/todos/todosSlice';

const store = configureStore({
	middleware: getDefaultMiddleware => getDefaultMiddleware(),
	reducer: {
		filters: filtersReducer,
		todos: todosReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;

export const wrapper = createWrapper(() => store);
