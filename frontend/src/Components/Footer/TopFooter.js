import React from 'react';
import { Link } from 'react-router-dom';
import { footerLinks } from './Constraint';
import styles from './Footer.module.css';
import { RiFacebookLine, RiTwitterFill, RiPlayMiniFill, RiInstagramLine } from 'react-icons/ri';
import clsx from 'clsx';
import Appstore from '../../Assests/appstore.png';
import Playstore from '../../Assests/playstore.png';

const FooterSection = ({ section }) => {
  return (
    <div className={styles.section}>
      <h5>{section.heading}</h5>
      <ul>
        {section.links.map((link, index) => (
          <Link key={index} to={`/${link}`}>
            {link}
          </Link>
        ))}
      </ul>
    </div>
  );
};

const TopFooter = () => {
  return (
    <div className={styles.topFooter}>
      <div className={styles.content}>
        {footerLinks.map((section, index) => (
          <FooterSection key={index} section={section} />
        ))}
        <div className={clsx(styles.section, styles.social)}>
          <div>
            <h5>FOLLOW US</h5>
            <ul>
              <a href='https://www.facebook.com/olxpakistan' target='_blank' rel='noopener noreferrer'>
                <RiFacebookLine />
              </a>
              <a href='https://twitter.com/OLX_Pakistan' target='_blank' rel='noopener noreferrer'>
                <RiTwitterFill />
              </a>
              <a
                href='https://www.youtube.com/channel/UCARDDjJnW7IRBpo_AP7WTHQ?sub_confirmation=1'
                target='_blank'
                rel='noopener noreferrer'
              >
                <RiPlayMiniFill />
              </a>
              <a href='https://www.instagram.com/olx.pakistan/' target='_blank' rel='noopener noreferrer'>
                <RiInstagramLine />
              </a>
            </ul>
          </div>
          <div>
            <a
              href='https://play.google.com/store/apps/details?id=com.olx.pk'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={Appstore} alt='appstore' />
            </a>
            <a href='https://apps.apple.com/app/olx-pakistan/id1119081665' target='_blank' rel='noopener noreferrer'>
              <img src={Playstore} alt='playstore' />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopFooter;