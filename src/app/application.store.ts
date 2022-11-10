import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { counterReducer, CounterStore } from './counter/counter.store';
import { rootSaga } from './root.saga';

export interface ApplicationStore {
  counter: CounterStore;
}

export function createApplicationStore(): Store<ApplicationStore> {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    combineReducers({
      counter: counterReducer,
    }),
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
