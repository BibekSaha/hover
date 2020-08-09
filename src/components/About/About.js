import React from 'react';
import Footer from '../Footer/Footer';
import './About.css';
import bibekSahaImage from '../../assets/images/Bibek-Saha.png';

const About = () => {
  return (
    <div className="About">
      <img id="bibek-saha-image" alt="bibek saha" src={bibekSahaImage} />
      <div>
        Hi! I am <strong className="make-it-yellow">Bibek Saha</strong> and I created this web application<br /><br />
        Lyrics Hound is a passion project. I love building stuff (useful and sometimes useless too.. I mean who needs a <a href="https://bibeksaha.github.io/dragndrop" rel="noopener noreferrer" target="_blank">Random Color Picker</a> )<br /><br />
        This is definitely one of the complicated project that I undertook. It has been an absolute joy working on this<br /><br />
        In future if I will try to add more features. If you find any bug do ping me on social media, the links are given below. I will try to patch it.
        <Footer />
      </div>
    </div>
  );
};

export default About;