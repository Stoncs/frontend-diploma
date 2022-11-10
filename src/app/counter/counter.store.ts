import { combineReducers, Action } from 'redux';
import { createReducer, PayloadAction, Reducer } from 'typesafe-actions';

import { decrementAction, incrementAction, setValueAction } from './counter.action';

export interface CounterStore {
  counter: number;
}

export const counterReducer: Reducer<CounterStore, Action> = combineReducers({
  counter: createReducer<number, Action>(0)
    .handleAction(decrementAction, state => state - 1)
    .handleAction(
      // TODO: wtf it resolves as never, mb use different lib
      incrementAction as (...args: any[]) => never,
      (state, { payload }: PayloadAction<string, number>) => state + payload,
    )
    .handleAction(
      // TODO: wtf it resolves as never, mb use different lib
      setValueAction as (...args: any[]) => never,
      (_, { payload }: PayloadAction<string, number>) => payload,
    ),
});
