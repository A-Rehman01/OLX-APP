import React from 'react';
import TopFooter from './TopFooter';
import styles from './Footer.module.css';
import img from '../../Assests/LowerAdd.png'
const Footer = () => {
  return (
    <footer>
      <div style={{marginTop:'25px'}}>
      <img width="100%" src={img} alt="img"/>
      </div>
      <TopFooter />
      <div className={styles.bottomFooter}>
        <span>
          <b>Other Countries India - South Africa - Indonesia</b>
        </span>
        <span>
          <b>Free Classifieds in Pakistan.</b> © 2006-2020 OLX
        </span>
      </div>
    </footer>
  );
};

export default Footer;