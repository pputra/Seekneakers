const styles = theme => ({
  flexContainer: {
    display:'flex', 
    justifyContent:'center', 
    alignItems:'center',
    flexDirection: 'column',
  },
  checkoutBtn: {
    display: 'flex', 
    justifyContent: 'flex-end', 
    width:'90%', 
    marginTop:'0.5%',
    [theme.breakpoints.up('md')]: {
      ...this,
      width:'50%', 
    },
  },
});

export default styles;