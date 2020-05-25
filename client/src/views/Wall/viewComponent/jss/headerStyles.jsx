import { container } from 'assets/jss/main'

const headerStyles = {
  wrap: {
    border: '1px solid #333',
    padding: "5rem 0",
    fontFamily: 'Lato, sans-serif',
    background:' #313947',
    position: 'relative',
    border: 'none'
  },
  container : {
    ...container
  },
  avatar : {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end'
  },
  avatarImg: {
    borderRadius: '50%',
    width: '15rem',
    height: '15rem',
    objectFit: 'cover'
  },
  displayName : {
    fontSize: '2.5rem',
    color: "rgba(255,255,255,.8)",
    fontWeight: '700',
    padding: 0,
    marginBottom: '.5rem'
  },
  job: {
    fontSize: '1.1rem',
    color: 'rgba(255,255,255,.8)',
    padding: 0,
  },
  status: {
    fontSize: '1.2rem',
    color: "#00B0FF"
  },
  editBtn: {
    float: 'right',
    color: "#fff",
    position: 'absolute',
    bottom: '.5rem',
    right: '.5rem'
  }
}

export default headerStyles