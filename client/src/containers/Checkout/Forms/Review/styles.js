const styles = theme => ({
  flexContainer: {
    display:'flex', 
    justifyContent:'center', 
    alignItems:'center',
    flexDirection: 'column',
  },
  reviewContent: {
    display:'flex',
    width: '90%',
    justifyContent: 'center',
    alignItems:'center',
    flexDirection:'column',
    [theme.breakpoints.up('md')]: {
      ...this,
      width: '25%',
    },
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});

export default styles;