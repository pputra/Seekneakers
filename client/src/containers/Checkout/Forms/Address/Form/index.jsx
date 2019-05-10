import React, { Fragment } from 'react';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { CountryOptions, USStateOptions } from '../../../../../components/Options';

const Form = props => {
  const { 
    classes, 
    handleChange, 
    inputs, 
    selectedCountry, 
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
                    <CountryOptions />
                  </Select>
                </FormControl>
              );
            }

            if (key === 'state' && selectedCountry === 'US') {
              return (
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="state">State</InputLabel>
                  <Select
                    native
                    value={value}
                    onChange={({target: {value}}) => handleChange(key, value)}
                  >
                    <USStateOptions />
                  </Select>
                </FormControl>
              )
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
      </Fragment>
  );
}

export default Form;