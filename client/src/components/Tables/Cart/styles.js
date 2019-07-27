const styles = theme => ({
  root: {
    width: '90%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    [theme.breakpoints.up('md')]: {
      ...this,
      width: '50%',
    },
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  productCol: {
    display:'flex', 
    justifyContent:'flex-start',
  },
  productName: {
    display:'flex', 
    justifyContent:'center', 
    alignItems:'center', 
    marginLeft:"3%",
  },
});

export default styles;