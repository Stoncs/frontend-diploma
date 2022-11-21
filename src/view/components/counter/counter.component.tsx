import styles from "./counter.style.scss";

import {
  asyncRandom,
  decrement,
  increment,
  selectCount,
} from "~/app/counter/counter.store";
import { useAppDispatch, useAppSelector } from "~/app/store.hooks";

export const Counter = () => {
  const number = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.counter}>
      <div className={styles.counter__value}>{number}</div>
      <button
        className={`${styles.counter__button} ${styles.minus}`}
        onClick={() => dispatch(decrement())}
      >
        -
      </button>
      <button
        className={`${styles.counter__button} ${styles.random}`}
        onClick={() => dispatch(asyncRandom())}
      >
        ?
      </button>
      <button
        className={`${styles.counter__button} ${styles.plus}`}
        onClick={() => dispatch(increment(2))}
      >
        +2
      </button>
    </div>
  );
};
