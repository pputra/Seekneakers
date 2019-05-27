import React from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const LoginForm = props => {
  const { classes, data, handleChange, handleSubmit } = props;
  
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form}>
          {data.map(({ value, key, type, label }, i) => {
            return (
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor={key}>{label}</InputLabel>
              <Input 
                id={key} 
                name={key} 
                type={type}
                autoComplete={type} 
                autoFocus={i === 0 && true}
                value={value} 
                onChange={({target: {value}}) => handleChange(key, value)}
              />
            </FormControl>
            );
          })}
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            className={classes.submit}
            onClick={(e) => handleSubmit(e)}
          >
            Log In
          </Button>
        </form>
      </Paper>
    </main>
  );
};

export default LoginForm;