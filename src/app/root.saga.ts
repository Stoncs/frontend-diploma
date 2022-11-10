import { all, Effect, fork } from 'redux-saga/effects';

import { counterSaga } from './counter/counter.saga';

export function* rootSaga(): Generator<Effect, void, void> {
  yield all([fork(counterSaga)]);
}
