import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import hotTopicStyles from '../../../assets/jss/hotTopicStyles'
import { Grid, Card } from '@material-ui/core'

import img1 from 'assets/img/title/windows.jpg'
import img2 from 'assets/img/title/macos.jpg'
import img3 from 'assets/img/title/ios.jpg'
import img4 from 'assets/img/title/android.jpg'

const options = [
  {
    title: 'Windows',
    img: img1
  },
  {
    title: 'macOS',
    img: img2
  },
  {
    title: 'iOS',
    img: img3
  },
  {
    title: 'Android',
    img: img4
  },
]

const topics = {
  windows: [
    {
      title: 'Nhờ tư vấn chọn laptop lập trình',
      link: '#'
    },
    {
      title: 'Máy em là Laptop Dell Inspiron N4050 win 7 nhưng khi cài lên win 10 lúc khởi động sau khi biểu...',
      link: '#'
    },
    {
      title: 'Ổ C của em cứ mỗi ngày lại mất thêm tầm 1gb là sao nhỉ :(( e không có cài j hết á quét virus thì..',
      link: '#'
    },
    {
      title: 'Cho mình xin ý kiến với mọi người. Với các trình duyệt hiện nay thì mình nên dùng trình duyệt nào? ',
      link: '#'
    },
    {
      title: 'Windows 10 Start menu mới',
      link: '#'
    }
  ],
  macos: [
    {
      title: 'Mọi người tư vấn về màn hình ngoài giúp mình với',
      link: '#'
    },
    {
      title: 'Em mình hiện đang là lập trình viên đang tính mua 1 con macbook pro 15in đi làm. Mọi người tư vấn...',
      link: '#'
    },
    {
      title: 'Mình xuất hình ảnh từ macbook 15" 2015 lên màn hình Dell P2319H qua cổng HDMI đang gặp hiện tượng...',
      link: '#'
    },
    {
      title: 'Có bác nào không sử dụng được tính năng Handoff giống như em không ạ?',
      link: '#'
    },
    {
      title: 'Gioăng cao su xung quanh viền màn hình Macbook pro 2017 rất dính',
      link: '#'
    },
  ],
  ios: [
    {
      title: 'Cho e hỏi sài iphone x lấy cục sạc vivo chính hãng sạc được không ạ',
      link: '#'
    },
    {
      title: 'Có bác nào lên ios 13.3.1...sử dụng máy có cảm giác máy bị nhanh nóng hơn không ạ...',
      link: '#'
    },
    {
      title: 'Này là lỗi gì v anh em, có sao ko ạ( chụp lên hình vết kia đậm màu lên quá ở ngoài ko nặng như vậy)',
      link: '#'
    },
    {
      title: 'Đồng bộ giữa hai iphone cùng tài khoản icloud ko ạ.',
      link: '#'
    },
    {
      title: 'Xsmax hàng xách tay hết bh. Giờ em phát hiện lỗi sóng 4g yếu quá',
      link: '#'
    },
  ],
  android: [
    {
      title: 'Mã độc trên Android đã có thể lấy cắp mã OTP từ Google Authenticator',
      link: '#'
    },
    {
      title: 'Mình mua cục Bluetooth Receiver Baseus BA02, kết nối với tivi Samsung 49RU8000 thì âm thanh ra tai nghe nó cứ giật giật ko ',
      link: '#'
    },
    {
      title: 'Quay phim điện thoại và phát trực tiếp lên máy chiếu, phát Camera trực tiếp lên Projector.',
      link: '#'
    },
    {
      title: 'Sử dụng song song iOS và Android! Tại sao không?',
      link: '#'
    },
    {
      title: 'Không biết lần này AI của anh Quảng có đủ thông minh để phân biệt được đâu là chuẩn, đâu là fake; đâu là fan và đâu là anti xl không.',
      link: '#'
    },
  ]
}

const Item = (props) => {
  const { classes } = props
  return (<>
    <Grid item sm={6}>
      <Card className={classes.cardBackground}>
        <div className={classes.cardHeader}>
          <img
            className={classes.img}
            src={props.item.img}
          />
          <p className={classes.cardTitle}>{props.item.title}</p>
        </div>
        <div className={classes.content}>
          {
            topics[props.item.title.toLowerCase()].map(topic =><a className={classes.link}href={topic.link}>{topic.title}</a>)
          }
        </div>
      </Card>
    </Grid>
  </>)
}

class HotTopic extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.background}>
        <Grid container className={classes.container} spacing={3} justify="space-between">
          <Grid item sm={12}>
            <h3 className={classes.title}>Hot Topic</h3>
          </Grid>
          {
            options.map(op => <Item item={op} classes={classes} />)
          }
        </Grid>
      </div>
    )
  }
}

export default withStyles(hotTopicStyles)(HotTopic)
