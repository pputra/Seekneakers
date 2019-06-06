const styles = (theme) => ({
  reviewForm: {
    width: '90%', 
    justifyContent:'center', 
    alignItems:'center', 
    display:'flex', 
    marginTop:'1%', 
    flexDirection:'column',
    [theme.breakpoints.up('md')]: {
      width: '40%', 
      justifyContent:'center', 
      alignItems:'center', 
      display:'flex', 
      marginTop:'1%', 
      flexDirection:'column',
    },
  },
  reviewList: {
    width: '90%', 
    justifyContent:'center', 
    alignItems:'center', 
    display:'flex', 
    marginTop:'1%',
    flexDirection:'column',

    [theme.breakpoints.up('sm')]: {
      width: '40%', 
      justifyContent:'center', 
      alignItems:'center', 
      display:'flex', 
      marginTop:'1%',
      flexDirection:'column',
    },
  },
});

export default styles;