import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import recentNewsStyles from 'assets/jss/recentNewsStyles'
import { Grid, Card, Button } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

import img1 from 'assets/img/sidebar/windows.jpg'
import img2 from 'assets/img/sidebar/macos.jpg'
import img3 from 'assets/img/sidebar/ios.jpg'
import img4 from 'assets/img/sidebar/android.jpg'

import news_img1 from 'assets/img/news_1.jpg'
import news_img2 from 'assets/img/news_2.jpg'
import news_img3 from 'assets/img/news_3.jpg'
import news_img4 from 'assets/img/news_4.jpg'
import news_img5 from 'assets/img/news_5.jpg'
import news_img6 from 'assets/img/news_6.jpg'
import news_img7 from 'assets/img/news_7.jpg'
import news_img8 from 'assets/img/news_8.jpg'
import news_img9 from 'assets/img/news_9.jpg'
import news_img10 from 'assets/img/news_10.jpg'

const items = [
  {
    img: img1,
    title: 'Windows',
    link: '/windows'
  },
  {
    img: img2,
    title: 'macOS',
    link: '/macos'
  },
  {
    img: img3,
    title: 'iOS',
    link: '/ios'
  },
  {
    img: img4,
    title: 'Android',
    link: '/android'
  }
]
const news = [
  {
    img: news_img1,
    title: 'Galaxy S20 là dòng điện thoại đầu tiên được chứng nhận sạc nhanh của Hiệp hội USB',
    body: 'Các dòng máy Samsung Galaxy S20 là những model điện thoại đầu tiên đạt chứng nhận sạc nhanh của Hiệp hội USB, theo đó nó hỗ trợ cả hai chuẩn USB Power Delivery (USB PD) 3.0...',
    author: 'Quang'
  },
  {
    img: news_img2,
    title: 'MacBook Air 2019 256GB giảm 300 USD, chỉ còn 999 USD trên Amazon',
    body: 'MacBook Air 2019 bản SSD 256GB hiện chỉ còn 999 USD trên Amazon, giảm gần 300 đô so với mức 1.299 USD trước đó.',
    author: 'VPhong'
  },
  {
    img: news_img3,
    title: 'Facebook cấm tất cả quảng cáo bán phương thuốc “chữa coronavirus”',
    body: 'Để cố gắng ngăn chặn dòng thông tin sai lệch xoay quanh dịch COVID-19, Facecbook vừa rồi đã quyết định cấm hết tất cả những quảng cáo có nội dung hứa hẹn “chữa được coronavirus”',
    author: 'khoanv'
  },
  {
    img: news_img4,
    title: 'Samsung bắt đầu sản xuất RAM 16 GB LPDDR5 cho smartphone!',
    body: 'Cái ngày mà smartphone có dung lượng RAM còn lớn hơn cả máy tính đã tới bởi Samsung vừa công bố sản xuất hàng loại bộ nhớ LPDDR5 dung lượng 16 GB đầu tiên trong ngành công nghiệp chip nhớ.',
    author: 'Quang'
  },
  {
    img: news_img5,
    title: 'Sony Xperia PRO: phiên bản "Xperia 1 II" hướng đến việc truyền video 5G từ máy ảnh / máy quay',
    body: 'Ngoài Xperia 1 II, Sony còn cho ra mắt một chiếc điện thoại được đặt tên là Xperia PRO. Bỏ qua tên gọi bị trùng với phiên bản MK16i thời Sony Ericsson thì đây chính là chiếc máy có phần cứng của Xperia 1 II nhưng có một thiết kế mang tính chuyên dụng',
    author: 'Phong'
  },
  {
    img: news_img6,
    title: 'Tốp 10 smartphone bán chạy Q42019: Apple chiếm 5 vị trí đầu',
    body: 'Tốp 10 smartphone bán chạy Q42019: Apple chiếm 5 vị trí đầu',
    author: 'khoanv'
  },
  {
    img: news_img7,
    title: 'Dịch COVID-19 khiến các kỹ sư Foxconn và Apple không thể gặp nhau để giám định sản phẩm',
    body: 'Nhà máy Foxconn - Trung Quốc đang gặp khó khăn vì trì hoãn sản xuất iPhone mới (iPhone 12) do tình hình dịch COVID-19. Vấn đề nằm ở chỗ khi các kỹ sư Apple và kỹ sư của Foxconn không thể gặp nhau để…',
    author: 'khoanv'
  },
  {
    img: news_img8,
    title: 'Chia sẻ trải nghiệm nhanh tai nghe Samsung Galaxy Buds+: bóng bẩy hơn, pin trâu hơn, đàm thoại tốt',
    body: 'Chào anh em, hôm nay mình đã có trên tay Samsung Galaxy Buds+ mới nhất, là phiên bản thương mại được bán ra chính thức với S20 Series cách đây vài ngày.',
    author: 'VPhong'
  },
  {
    img: news_img9,
    title: 'iOS 14 là cơ hội để Apple nới lỏng giới hạn, iPhone sẽ ‘mở’ hơn',
    body: 'Người ta thích iOS, iPhone vì sự đơn giản và trải nghiệm ổn định, mượt mà của nó nhưng chính sự đóng cửa, quá khắt khe của Apple cũng ảnh hưởng tới việc sử dụng máy hàng ngày.',
    author: 'VPhong'
  },
  {
    img: news_img10,
    title: 'Valley of Fire: Apple lại khoe khả năng quay clip bằng iPhone 11 Pro',
    body: 'Vừa rồi Apple đăng tải một đoạn clip mới lên kênh YouTube của họ, một tác phẩm thuộc series “Shot on iPhone”, khoe khoang khả năng quay video 4K ấn tượng của chiếc iPhone 11.',
    author: 'Quang'
  },
]

const SideBar = (props) => {
  const { classes } = props
  return (

    <>
      <h3 className={classes.title}>
        Topic
      </h3>
      {
        items.map(item => <CardItem item={item} classes={classes} />)
      }

    </>

  );
}

const CardItem = (props) => {
  const { classes } = props
  return <>

    <Button className={classes.btn}>
      <NavLink to={props.item.link} style={{ textDecoration: 'none', textTransform: 'none' }}>
        <Grid container spacing={3}>
          <Grid item sm={4}>
            <img
              className={classes.img}
              src={props.item.img}
            />
          </Grid>
          <Grid item sm={8}>
            <h4 className={classes.linkText}>{props.item.title}</h4>
          </Grid>
        </Grid>
      </NavLink>

    </Button>
  </>
}


const NewsItem = (props) => {
  const { classes } = props
  return <>
    <Button className={classes.newsItem}>
      <NavLink to="#" className={classes.newsItemTitle}>
        <Grid container>
          <Grid item sm={3}>
            <img
              className={classes.newsImg}
              src={props.item.img} />
          </Grid>
          <Grid item sm={9}>
            <h4 className={classes.newsTitle}>{props.item.title}</h4>
            <p className={classes.newsBodyText}>{props.item.body}</p>
            <p className={classes.newsAuthorText}>{props.item.author}</p>
          </Grid>
        </Grid>
      </NavLink>
    </Button>
  </>
}

class RecentNews extends Component {

  render() {
    const { classes } = this.props
    return (
      <div className={classes.background}>
        <Grid container className={classes.container}>
          <Grid item sm={3}>
            <SideBar classes={classes} />
          </Grid>
          <Grid item sm={9}>
            <Card className={classes.cardBg}>
              <h3 className={classes.titleDark}>
                Recent News
      </h3>
              {
                news.map(item => <NewsItem classes={classes} item={item} />)
              }
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(recentNewsStyles)(RecentNews)
