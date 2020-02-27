import React, { Component } from "react";
import Slider from "react-slick";
import img1 from 'assets/img/news_1.jpg'
import img2 from 'assets/img/news_2.jpg'
import img3 from 'assets/img/news_3.jpg'
import img4 from 'assets/img/news_4.jpg'
import img5 from 'assets/img/news_5.jpg'
import { withStyles } from "@material-ui/styles";
import carouselStyles from "../assets/jss/carouselStyles";
import classNames from 'classnames'

const items = [
  {
    img: img1,
    title: 'Galaxy S20 là dòng điện thoại đầu tiên được chứng nhận sạc nhanh của Hiệp hội USB',
    body: 'Các dòng máy Samsung Galaxy S20 là những model điện thoại đầu tiên đạt chứng nhận sạc nhanh của Hiệp hội USB, theo đó nó hỗ trợ cả hai chuẩn USB Power Delivery (USB PD) 3.0...'
  },
  {
    img: img2,
    title: 'MacBook Air 2019 256GB giảm 300 USD, chỉ còn 999 USD trên Amazon',
    body: 'MacBook Air 2019 bản SSD 256GB hiện chỉ còn 999 USD trên Amazon, giảm gần 300 đô so với mức 1.299 USD trước đó.'
  },
  {
    img: img3,
    title: 'Facebook cấm tất cả quảng cáo bán phương thuốc “chữa coronavirus”',
    body: 'Để cố gắng ngăn chặn dòng thông tin sai lệch xoay quanh dịch COVID-19, Facecbook vừa rồi đã quyết định cấm hết tất cả những quảng cáo có nội dung hứa hẹn “chữa được coronavirus”'
  },
  {
    img: img4,
    title: 'Samsung bắt đầu sản xuất RAM 16 GB LPDDR5 cho smartphone!',
    body: 'Cái ngày mà smartphone có dung lượng RAM còn lớn hơn cả máy tính đã tới bởi Samsung vừa công bố sản xuất hàng loại bộ nhớ LPDDR5 dung lượng 16 GB đầu tiên trong ngành công nghiệp chip nhớ.'
  },
  {
    img: img5,
    title: 'Sony Xperia PRO: phiên bản "Xperia 1 II" hướng đến việc truyền video 5G từ máy ảnh / máy quay',
    body: 'Ngoài Xperia 1 II, Sony còn cho ra mắt một chiếc điện thoại được đặt tên là Xperia PRO. Bỏ qua tên gọi bị trùng với phiên bản MK16i thời Sony Ericsson thì đây chính là chiếc máy có phần cứng của Xperia 1 II nhưng có một thiết kế mang tính chuyên dụng'
  },
]

function Item(props) {
  const { classes } = props;
  return (
    <div>
      <img
        className={classNames('slick-image', classes.img)}
        src={props.item.img}
      />
      <div className={classNames('slick-caption', classes.caption)}>
        <h4>{props.item.title}</h4>
        <p>{props.item.body}</p>
      </div>
    </div>
  )
}

class Carousel extends Component {
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
          {
            items.map(item => <Item item={item} classes={classes}/>)
          }


        </Slider>
      </div>
    );
  }
}

export default withStyles(carouselStyles)(Carousel)