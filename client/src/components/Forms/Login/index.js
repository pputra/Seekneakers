import React from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const LoginForm = props => {
  const { classes, inputs, handleChange } = props;
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form}>
          {Object.keys(inputs).map((key, i) => {
            const { label, value } = inputs[key];
            return (
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor={key}>{label}</InputLabel>
              <Input 
                id={i} 
                name={key} 
                autoComplete={key} 
                autoFocus
                value={value} 
                onChange={({target: {value}}) => handleChange(key, value)}
                />
            </FormControl>
            );
          })}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
        </form>
      </Paper>
    </main>
  );
};

export default LoginForm;