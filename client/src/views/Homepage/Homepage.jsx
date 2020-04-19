import React, { Component } from 'react';

import NavBar from 'components/NavBar.jsx';
import MainThreads from './viewSections/MainThreads';
import HomeRecentNews from './viewSections/HomeRecentNews';
import HotTopic from './viewSections/HotTopic';
import Footer from '../../components/Footer';

export class Homepage extends Component {
  render() {
    return (
      <>
        <NavBar />
        <MainThreads />
        <HomeRecentNews />
        <HotTopic />
        <Footer />
      </>
    );
  }
}

export default Homepage;
