import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid, Box, Divider, Hidden, ButtonBase } from '@material-ui/core';
import axios from 'axios/instance';
import { Link } from 'react-router-dom';

import verticalCarouselStyle from 'assets/jss/verticalCarouselStyles.jsx';

import Slider from 'react-slick';
import img1 from 'assets/img/news_6.jpg';
import img2 from 'assets/img/news_7.jpg';
import img3 from 'assets/img/news_8.jpg';
import img4 from 'assets/img/news_9.jpg';
import img5 from 'assets/img/news_10.jpg';
import classNames from 'classnames';
import { parseTextFromHTML, parseStringFrom } from 'utils/converter';
import Loading from 'components/Loading';

const items = [
  {
    thumbnail: img1,
    header: 'Tốp 10 smartphone bán chạy Q42019: Apple chiếm 5 vị trí đầu',
    content: 'Tốp 10 smartphone bán chạy Q42019: Apple chiếm 5 vị trí đầu',
    author: 'khoanv',
  },
  {
    thumbnail: img2,
    header:
      'Dịch COVID-19 khiến các kỹ sư Foxconn và Apple không thể gặp nhau để giám định sản phẩm',
    content:
      'Nhà máy Foxconn - Trung Quốc đang gặp khó khăn vì trì hoãn sản xuất iPhone mới (iPhone 12) do tình hình dịch COVID-19. Vấn đề nằm ở chỗ khi các kỹ sư Apple và kỹ sư của Foxconn không thể gặp nhau để…',
    author: 'khoanv',
  },
  {
    thumbnail: img3,
    header:
      'Chia sẻ trải nghiệm nhanh tai nghe Samsung Galaxy Buds+: bóng bẩy hơn, pin trâu hơn, đàm thoại tốt',
    content:
      'Chào anh em, hôm nay mình đã có trên tay Samsung Galaxy Buds+ mới nhất, là phiên bản thương mại được bán ra chính thức với S20 Series cách đây vài ngày.',
    author: 'VPhong',
  },
  {
    thumbnail: img4,
    header: 'iOS 14 là cơ hội để Apple nới lỏng giới hạn, iPhone sẽ ‘mở’ hơn',
    content:
      'Người ta thích iOS, iPhone vì sự đơn giản và trải nghiệm ổn định, mượt mà của nó nhưng chính sự đóng cửa, quá khắt khe của Apple cũng ảnh hưởng tới việc sử dụng máy hàng ngày.',
    author: 'VPhong',
  },
  {
    thumbnail: img5,
    header:
      'Valley of Fire: Apple lại khoe khả năng quay clip bằng iPhone 11 Pro',
    content:
      'Vừa rồi Apple đăng tải một đoạn clip mới lên kênh YouTube của họ, một tác phẩm thuộc series “Shot on iPhone”, khoe khoang khả năng quay video 4K ấn tượng của chiếc iPhone 11.',
    author: 'Quang',
  },
];

function Item(props) {
  const { classes, item } = props;
  return (
    <ButtonBase component={Link} to={`/news/${item.id}`}>
      <Grid container justify='space-between' spacing={1}>
        <Grid item sm={3} xs={4} className={classes.imgWrapper}>
          <img
            className={classNames('slick-image', classes.img)}
            src={item.thumbnail}
            alt=''
          />
        </Grid>
        <Grid item sm={9} xs={8} className={classes.caption}>
          <h4 className={classes.title}>{item.header}</h4>
          <p
            className={classes.bodyText}
            dangerouslySetInnerHTML={{
              __html: parseTextFromHTML(item.content),
            }}
          ></p>
          <Box className={classes.authorWrapper}>
            <p className={classes.author}>
              {item.user ? item.user.display_name : 'John'}
            </p>
            <p className={classes.views}>{parseStringFrom(item.views)} views</p>
          </Box>
        </Grid>
      </Grid>
      <Hidden mdUp>
        <Divider />
      </Hidden>
    </ButtonBase>
  );
}

class VerticalCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    axios.get('/news/trending').then(res => {
      this.setState({
        news: res.data.news,
        isLoading: false,
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { isLoading, news } = this.state;
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      vertical: true,
      arrows: false,
    };
    return isLoading ? (
      <Loading />
    ) : (
      <>
        <Slider {...settings}>
          {
            // items.map(item => <Item item={item} classes={ classes } />)
            news.map(item => {
              return <Item key={item.id} item={item} classes={classes} />;
            })
          }
        </Slider>
      </>
    );
  }
}

export default withStyles(verticalCarouselStyle)(VerticalCarousel);
