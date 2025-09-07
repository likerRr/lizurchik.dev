import { author } from '../../lib/config';
import { SocialLinks } from './SocialLinks';

import styles from './styles.module.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        © {currentYear} {author}
      </div>

      <SocialLinks />
    </footer>
  );
};
