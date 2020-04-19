import React, { Component } from 'react';

import Slider from 'react-slick';
import TrendingNewsItem from './TrendingNewsItem';

class VerticalCarousel extends Component {
  render() {
    const settings = {
      vertical: true,
      arrows: false,
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      verticalSwiping: true,
      swipeToSlide: true,
    };
    const { news } = this.props;

    return (
      <>
        {news.length !== 0 && (
          <Slider {...settings}>
            {news.map(news => (
              <TrendingNewsItem key={news.id} news={news} />
            ))}
          </Slider>
        )}
      </>
    );
  }
}

export default VerticalCarousel;
