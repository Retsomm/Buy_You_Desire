import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { RootState } from '../store';
import type { CartActionTypes } from '../store/types/cartTypes';

// 
type AppDispatch = ThunkDispatch<RootState, unknown, CartActionTypes>;

// Use typed hooks throughout the app
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;