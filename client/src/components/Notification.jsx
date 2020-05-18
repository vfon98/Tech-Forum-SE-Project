import { store } from 'react-notifications-component';

const notification = (option) => {
  store.addNotification({
    title: option?.title ? option.title : 'Notification',
    message: option?.message ? option.message: 'Notification message!',
    type: option?.type ? option.type : 'success',
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: option?.duration ? option.duration : 3000,
      onScreen: true
    }
  });
}

export default notification
