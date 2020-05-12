import React, { Component } from 'react';
import Slider from 'react-slick';
import img1 from 'assets/img/news_1.jpg';
import img2 from 'assets/img/news_2.jpg';
import img3 from 'assets/img/news_3.jpg';
import img4 from 'assets/img/news_4.jpg';
import img5 from 'assets/img/news_5.jpg';
import { withStyles } from '@material-ui/styles';
import carouselStyles from '../../../assets/jss/carouselStyles';
import classNames from 'classnames';
import axios from 'axios/instance';

import { Link } from 'react-router-dom';
import { parseTextFromHTML } from 'utils/converter';
import { ButtonBase } from '@material-ui/core';

const items = [
  {
    thumbnail: img1,
    header:
      'Galaxy S20 là dòng điện thoại đầu tiên được chứng nhận sạc nhanh của Hiệp hội USB',
    content:
      'Các dòng máy Samsung Galaxy S20 là những model điện thoại đầu tiên đạt chứng nhận sạc nhanh của Hiệp hội USB, theo đó nó hỗ trợ cả hai chuẩn USB Power Delivery (USB PD) 3.0...',
  },
  {
    thumbnail: img2,
    header: 'MacBook Air 2019 256GB giảm 300 USD, chỉ còn 999 USD trên Amazon',
    content:
      'MacBook Air 2019 bản SSD 256GB hiện chỉ còn 999 USD trên Amazon, giảm gần 300 đô so với mức 1.299 USD trước đó.',
  },
  {
    thumbnail: img3,
    header: 'Facebook cấm tất cả quảng cáo bán phương thuốc “chữa coronavirus”',
    content:
      'Để cố gắng ngăn chặn dòng thông tin sai lệch xoay quanh dịch COVID-19, Facecbook vừa rồi đã quyết định cấm hết tất cả những quảng cáo có nội dung hứa hẹn “chữa được coronavirus”',
  },
  {
    thumbnail: img4,
    header: 'Samsung bắt đầu sản xuất RAM 16 GB LPDDR5 cho smartphone!',
    content:
      'Cái ngày mà smartphone có dung lượng RAM còn lớn hơn cả máy tính đã tới bởi Samsung vừa công bố sản xuất hàng loại bộ nhớ LPDDR5 dung lượng 16 GB đầu tiên trong ngành công nghiệp chip nhớ.',
  },
  {
    thumbnail: img5,
    header:
      'Sony Xperia PRO: phiên bản "Xperia 1 II" hướng đến việc truyền video 5G từ máy ảnh / máy quay',
    content:
      'Ngoài Xperia 1 II, Sony còn cho ra mắt một chiếc điện thoại được đặt tên là Xperia PRO. Bỏ qua tên gọi bị trùng với phiên bản MK16i thời Sony Ericsson thì đây chính là chiếc máy có phần cứng của Xperia 1 II nhưng có một thiết kế mang tính chuyên dụng',
  },
];

function Item(props) {
  const { classes, item } = props;
  return (
    <ButtonBase component={Link} to={`/news/${item._id}`}>
      <div>
        <img
          className={classNames('slick-image', classes.img)}
          src={item.thumbnail}
        />
        <div className={classNames('slick-caption', classes.caption)}>
          <h4 className={classes.itemHeader}>{item.header}</h4>
          <p
            className={classes.itemContent}
            dangerouslySetInnerHTML={{ __html: parseTextFromHTML(item.content) }}
          ></p>
        </div>
      </div>
    </ButtonBase>
  );
}

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
  }

  componentDidMount() {
    axios
      .get('/news/random?size=5')
      .then(res => {
        this.setState({
          news: res.data.news,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div>
        <Slider {...settings}>
          {/* Change to items.map... to use local data */}
          {this.state.news.map((item, index) => (
            <Item key={index} item={item} classes={classes} />
          ))}
        </Slider>
      </div>
    );
  }
}

export default withStyles(carouselStyles)(Carousel);
