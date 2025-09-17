import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin';
import { FaRss } from '@react-icons/all-files/fa/FaRss';
import * as React from 'react';
import { author, feedUrl, github, host, linkedin } from '@/lib/config';
import styles from './styles.module.css';

export const SocialLinks = () => {
  return (
    <div className={styles.social}>
      {linkedin && (
        <a
          className={styles.linkedin}
          href={`https://www.linkedin.com/in/${linkedin}`}
          title={`LinkedIn ${author}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
      )}

      {github && (
        <a
          className={styles.github}
          href={`https://github.com/${github}`}
          title={`GitHub @${github}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
      )}

      <a
        className={styles.rss}
        href={`${host}${feedUrl}`}
        title="RSS Feed"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaRss />
      </a>
    </div>
  );
};
