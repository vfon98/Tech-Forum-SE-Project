import React, { Component } from 'react';
import { Paper, Typography } from '@material-ui/core';
import Slider from 'react-slick';
import axios from '../../../axios/instance';

import { withStyles } from '@material-ui/styles';
import newsStyles from '../../../assets/jss/newsStyles';

import BannerItem from './Banner/BannerItem';
import Loading from '../../../components/Loading';

const SliderWrapper = props => {
  const settings = {
    autoplay: true,
    infinite: true,
    dots: false,
    arrows: false,
    swipeToSlide: true,
    rtl: props.rtl || false,
    slidesToShow: props.slidesToShow,
    speed: props.speed || 1000,
  };

  return (
    <Slider {...settings} {...props}>
      {props.children}
    </Slider>
  );
};

class BannerNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomNews: [],
      isLoading: true
    };
  }

  componentDidMount() {
    axios.get('/news/random').then(res => {
      this.setState({
        randomNews: res.data.news,
        isLoading: false
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { randomNews, isLoading } = this.state;

    return isLoading ? <Loading /> : (
      <Paper className={classes.bannerWrapper}>
        <Typography className={classes.bannerTitle}>Random News</Typography>
        <SliderWrapper slidesToShow={2} autoplaySpeed={5000}>
          {randomNews &&
            randomNews.map((news, index) => {
              if (index < 4) {
                return <BannerItem key={news.id} news={news} />;
              }
            })}
        </SliderWrapper>
        <SliderWrapper slidesToShow={3} rtl={true} autoplaySpeed={4000}>
          {randomNews &&
            randomNews.map((news, index) => {
              if (index >= 4) {
                return <BannerItem key={news.id} news={news} />;
              }
            })}
        </SliderWrapper>
      </Paper>
    );
  }
}

export default withStyles(newsStyles)(BannerNews);
