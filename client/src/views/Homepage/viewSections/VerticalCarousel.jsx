import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'

import verticalCarouselStyle from 'assets/jss/verticalCarouselStyles.jsx'

import Slider from "react-slick";
import img1 from 'assets/img/news_6.jpg'
import img2 from 'assets/img/news_7.jpg'
import img3 from 'assets/img/news_8.jpg'
import img4 from 'assets/img/news_9.jpg'
import img5 from 'assets/img/news_10.jpg'
import classNames from 'classnames'

const items = [
  {
    img: img1,
    title: 'Tốp 10 smartphone bán chạy Q42019: Apple chiếm 5 vị trí đầu',
    body: 'Tốp 10 smartphone bán chạy Q42019: Apple chiếm 5 vị trí đầu',
    author: 'khoanv'
  },
  {
    img: img2,
    title: 'Dịch COVID-19 khiến các kỹ sư Foxconn và Apple không thể gặp nhau để giám định sản phẩm',
    body: 'Nhà máy Foxconn - Trung Quốc đang gặp khó khăn vì trì hoãn sản xuất iPhone mới (iPhone 12) do tình hình dịch COVID-19. Vấn đề nằm ở chỗ khi các kỹ sư Apple và kỹ sư của Foxconn không thể gặp nhau để…',
    author: 'khoanv'
  },
  {
    img: img3,
    title: 'Chia sẻ trải nghiệm nhanh tai nghe Samsung Galaxy Buds+: bóng bẩy hơn, pin trâu hơn, đàm thoại tốt',
    body: 'Chào anh em, hôm nay mình đã có trên tay Samsung Galaxy Buds+ mới nhất, là phiên bản thương mại được bán ra chính thức với S20 Series cách đây vài ngày.',
    author: 'VPhong'
  },
  {
    img: img4,
    title: 'iOS 14 là cơ hội để Apple nới lỏng giới hạn, iPhone sẽ ‘mở’ hơn',
    body: 'Người ta thích iOS, iPhone vì sự đơn giản và trải nghiệm ổn định, mượt mà của nó nhưng chính sự đóng cửa, quá khắt khe của Apple cũng ảnh hưởng tới việc sử dụng máy hàng ngày.',
    author: 'VPhong'
  },
  {
    img: img5,
    title: 'Valley of Fire: Apple lại khoe khả năng quay clip bằng iPhone 11 Pro',
    body: 'Vừa rồi Apple đăng tải một đoạn clip mới lên kênh YouTube của họ, một tác phẩm thuộc series “Shot on iPhone”, khoe khoang khả năng quay video 4K ấn tượng của chiếc iPhone 11.',
    author: 'Quang'
  },
]

function Item(props) {
  const { classes } = props
  return (
    <div>
      <Grid container justify="space-between">
        <Grid item sm={3}>
          <img className={classNames('slick-image', classes.img)} src={props.item.img} alt="" />
        </Grid>
        <Grid item sm={9} className={classes.caption}>
          <h4 className={classes.title}>{props.item.title}</h4>
          <p className={classes.bodyText}>{props.item.body}</p>
          <p className={classes.author}>{props.item.author}</p>
        </Grid>
      </Grid>
    </div>)

}

class VerticalCarousel extends Component {
  render() {
    const { classes } = this.props;
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      vertical: true,
      arrows: false
    };
    return (
      <>
        <Slider {...settings}>
          {
            items.map(item => <Item item={item} classes={ classes } />)
          }

        </Slider>

      </>
    )
  }
}

export default withStyles(verticalCarouselStyle)(VerticalCarousel)
