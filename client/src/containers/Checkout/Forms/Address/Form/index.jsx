import React from 'react';

import { CountryOptions, USStateOptions } from '../../../../../components/Options';
import { 
  TextField,
  InputLabel,
  Select,
  FormControl,
} from '@material-ui/core';

const Form = props => {
  const { 
    classes, 
    handleChange, 
    inputs, 
    selectedCountry, 
  } = props;
    
  return (
    <div className={classes.flexContainer}>
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
    </div>
  );
}

export default Form;