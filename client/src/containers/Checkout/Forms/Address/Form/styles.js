const styles = theme => ({
  flexContainer: {
    display:'flex', 
    justifyContent:'center', 
    alignItems:'center',
  },
  container: {
    width: '90%',
    [theme.breakpoints.up('md')]: {
      width:'40%', 
    },
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

export default styles;