const styles = theme => ({
  root: {
    width: '50%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
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