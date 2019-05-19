const styles = theme => ({
  flexContainer: {
    display:'flex', 
    justifyContent:'center', 
    alignItems:'center',
    flexDirection: 'column',
  },
  reviewContent: {
    display:'flex',
    width: '25%',
    justifyContent: 'center',
    alignItems:'center',
    flexDirection:'column'
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});

export default styles;