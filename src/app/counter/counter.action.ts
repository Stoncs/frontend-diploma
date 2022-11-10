import { createAction } from 'typesafe-actions';

export const DECREMENT_ACTION_TYPE = '@@COUNTER/decrement';
export const INCREMENT_ACTION_TYPE = '@@COUNTER/increment';
export const SET_VALUE_ACTION_TYPE = '@@COUNTER/set-value';
export const REQUEST_SET_VALUE_ACTION_TYPE = '@@COUNTER/request-set-value';

export const decrementAction = createAction(DECREMENT_ACTION_TYPE)();
export const requestSetValueAction = createAction(REQUEST_SET_VALUE_ACTION_TYPE)();
export const incrementAction = createAction(INCREMENT_ACTION_TYPE)<number>();
export const setValueAction = createAction(SET_VALUE_ACTION_TYPE)<number>();
