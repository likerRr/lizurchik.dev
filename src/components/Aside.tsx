import { SocialLinks } from './SocialLinks';

import styles from '@/styles/styles.module.css';

export const Aside = () => {
  return (
    <div className={styles.asideContainer}>
      <SocialLinks />
    </div>
  );
};
