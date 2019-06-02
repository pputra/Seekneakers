const styles = () => ({
  root: {
    width:'100%',
    marginBottom: '2%',
  },
  username: {
    display:'flex', 
    justifyContent:'flex-start', 
    alignItems:'center',
  },
  title: {
    marginLeft:10, 
    display:'flex', 
    justifyContent:'flex-start', 
    alignItems:'center',
  },
  content: {
    margin: 10,
  },
  actions: {
    margin: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'auto'
  }
});

export default styles;