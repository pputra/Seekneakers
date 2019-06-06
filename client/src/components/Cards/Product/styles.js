const styles = theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    width: '300px',  
    [theme.breakpoints.up('md')]: {
      ...this,
      width: 'auto'
    },
  },
  cardMedia: {
    paddingTop: '70%',
    width: 'auto'
  },
  cardContent: {
    flexGrow: 1,
  },
});

export default styles;