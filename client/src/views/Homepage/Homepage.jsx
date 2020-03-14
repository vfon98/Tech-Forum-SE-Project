import React, { Component } from 'react';

import NavBar from 'components/NavBar.jsx';
import MainThreads from './viewSections/MainThreads';
import RecentNews from './viewSections/RecentNews';
import HotTopic from './viewSections/HotTopic';
import Footer from '../../components/Footer';

export class Homepage extends Component {
  render() {
    return (
      <>
        <NavBar
          brand='Covid'
          brandHighlight='Forum'
        />
        <MainThreads />
        <RecentNews />
        <HotTopic />
        <Footer />
      </>
    );
  }
}

export default Homepage;
