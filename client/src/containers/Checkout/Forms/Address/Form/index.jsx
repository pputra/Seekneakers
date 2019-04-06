import React, { Fragment } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

const Form = props => {
  const { 
    classes, 
    handleChange, 
    handleNext, 
    handleBack, 
    inputs, 
    activeStep, 
  } = props;
    
  return (
    <Fragment>
        <FormControl className={classes.container}>
          {inputs.map(({value, key, type, label}) => {
            if (key === 'country') {
              return (
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="country">Country</InputLabel>
                  <Select
                    native
                    value={value}
                    onChange={({target: {value}}) => handleChange(key, value)}
                  >
                    <option value="" />
                    <option value={'lorem'}>lorem</option>
                    <option value={'ipsum'}>ipsum</option>
                    <option value={'foo'}>foo</option>
                  </Select>
                </FormControl>
              );
            }

            return (
              <TextField
              id={key}
              label={label}
              type={type}
              className={classes.textField}
              onChange={({target: {value}}) => handleChange(key, value)}
              value={value}
              margin="normal"
              variant="outlined"
             />
            );
        })}
        </FormControl>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className={classes.backButton}
        >
          Back
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleNext}
        >
          Next
        </Button>
      </Fragment>
  );
}

export default Form;