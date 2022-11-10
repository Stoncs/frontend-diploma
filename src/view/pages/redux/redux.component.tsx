import styles from './redux.style.scss';

import { Counter } from '~/view/components/counter/counter.component';

const DESCRIPTION = `На этой странице происходит взаимодействие с Redux.\n
Обратите внимание, что состояние счетчика сохраняется между перемонтированиями компонента страницы.`;

export const Redux = () => {
  return (
    <div className={styles.redux}>
      <p className={styles.redux__disclaimer}>{DESCRIPTION}</p>
      <Counter />
    </div>
  );
};
