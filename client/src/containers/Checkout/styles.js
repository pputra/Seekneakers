const styles = theme => ({
  root: {
    width: '100%',
  },
  flexContainer: {
    width: '100%', 
    display:'flex', 
    alignItems:'center', 
    justifyContent:'center', 
    flexDirection:'column'
  },
  mainFormContainer: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
});

export default styles;