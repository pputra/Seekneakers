const styles = theme => ({
  card: {
    width: '90%',
    [theme.breakpoints.up('md')]: {
      width: '40%',
    },
  },
  cardContent: {
    padding:10,
  },
});

export default styles;