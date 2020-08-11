import React from 'react';
import Footer from '../Footer/Footer';
import './About.css';
import bibekSahaImage from '../../assets/images/Bibek-Saha.png';

const About = () => {
  return (
    <div className="About">
      <img id="bibek-saha-image" alt="bibek saha" src={bibekSahaImage} />
      <div>
        Hi! I am <strong className="make-it-yellow">Bibek Saha</strong> and I'm the creator of Lyrics Hound<br /><br />
        Lyrics Hound is an FREE service where one can listen to the music and read the lyrics at the same time.<br/><br/>
        <em style={{fontSize: '0.9rem'}}>Disclaimer: The rights to the song and lyrics goes to the individual artist and the record label</em><br/><br/>
        {/* I love building stuff (useful and sometimes useless too.. I mean who needs a <a href="https://bibeksaha.github.io/dragndrop" rel="noopener noreferrer" target="_blank">Random Color Picker</a> anyway)<br /><br /> */}
        This is definitely one of the complicated project that I undertook. It has been an absolute joy working on this<br /><br />
        In future if I will try to add more features. If you find any bug do ping me on social media, the links are given below. I will try to patch it.
        <Footer />
      </div>
    </div>
  );
};

export default About;