import ReactMarkdown from 'react-markdown';

import rules from '../../../../README.md';

import styles from './rules.style.scss';

export const Rules = () => {
  return (
    <div className={styles.rules__page}>
      <ReactMarkdown>{rules}</ReactMarkdown>
    </div>
  );
};
