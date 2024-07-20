import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Hero from '../Components/Hero/Hero';
import Title from '../Components/Title/Title';
import Contact from '../Components/Contact/Contact';
import Footer from '../Components/Footer/Footer';
import NewsSection from '../Components/NewsSection/NewsSection'; // Create NewsSection component
import Counter from "../Components/Counter/Counter";
import './Home.css'

const Home = () => {
  return (
    <div id='home'>
      <Navbar />
      <Hero />
      <Title subTitle='News Section' title='LATEST NEWS' />
      <NewsSection />
      <Title subTitle='Giveaway Section' title='JOIN NOW' />
      <Counter/>
      <Title subTitle='Contact Section' title='CONTACT US' />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;