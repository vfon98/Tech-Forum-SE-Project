import React, { Component } from 'react';

import NavBar from 'components/NavBar.jsx';
import MainThreads from './viewSections/MainThreads';
import HomeRecentNews from './viewSections/HomeRecentNews';
import HotTopic from './viewSections/HotTopic';

export class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: null
    }
  }
  
  render() {
    return (
      <>
        <NavBar isLogin={state => this.setState({ isLogin: state })} />
        <MainThreads />
        <HomeRecentNews />
        <HotTopic />
        {/* <Footer /> */}
      </>
    );
  }
}

export default Homepage;
