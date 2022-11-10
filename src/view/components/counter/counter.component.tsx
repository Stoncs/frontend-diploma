import { useDispatch, useSelector } from 'react-redux';

import { ApplicationStore } from '../../../app/application.store';
import {
  decrementAction,
  incrementAction,
  requestSetValueAction,
} from '../../../app/counter/counter.action';

import styles from './counter.style.scss';

export const Counter = () => {
  const number = useSelector<ApplicationStore, number>(state => state.counter.counter);
  const dispatch = useDispatch();

  return (
    <div className={styles.counter}>
      <div className={styles.counter__value}>{number}</div>
      <button
        className={`${styles.counter__button} ${styles.minus}`}
        onClick={() => dispatch(decrementAction())}
      >
        -
      </button>
      <button
        className={`${styles.counter__button} ${styles.random}`}
        onClick={() => dispatch(requestSetValueAction())}
      >
        ?
      </button>
      <button
        className={`${styles.counter__button} ${styles.plus}`}
        onClick={() => dispatch(incrementAction(2))}
      >
        +2
      </button>
    </div>
  );
};
