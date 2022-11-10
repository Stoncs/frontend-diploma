import { call, Effect, ForkEffect, put, takeLatest } from 'redux-saga/effects';

import { requestSetValueAction, setValueAction } from './counter.action';

function getAsyncRandomInt(): Promise<number> {
  return new Promise(r => {
    setTimeout(() => {
      r(Math.floor(Math.random() * 100));
    });
  });
}

export function* setCounterValue(): Generator<Effect | Generator, void, number> {
  const value = yield call(getAsyncRandomInt);
  yield put(setValueAction(value));
}

export function* counterSaga(): Generator<Effect | Generator, void, ForkEffect> {
  yield takeLatest(requestSetValueAction, setCounterValue);
}
