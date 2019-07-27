const styles = theme => ({
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      ...this,
      width: '500px',
      height: '200px',
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  image: {
    width: 'auto',
    height: '50%',
  },
});

export default styles;