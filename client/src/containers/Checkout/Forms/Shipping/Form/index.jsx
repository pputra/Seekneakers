import React, { Fragment } from 'react';

import ShippingCard from '../../../../../components/Cards/Shipping';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';

const Form = props => {
  const { 
    classes,
    handleChange,
    inputs,
    chooosenRateIndex,
  } = props;
    
  return (
    <Fragment>
      <FormControl className={classes.container}>
        <RadioGroup
          aria-label="shipping"
          name="shipping"
          className={classes.group}
          value={chooosenRateIndex}
          onChange={({target: {value}}) => handleChange('chooosenRateIndex', Number(value))}
        >
          {inputs.map((input, i) => {
            const { 
              provider,
              name,
              image,
              estimated_days,
              price,
              duration_terms
            } = input;

            return (
              <FormControlLabel 
                className={classes.radioOption}
                value={i} 
                control={<Radio checked={chooosenRateIndex === i}/>} 
                label={
                  <ShippingCard
                    provider={provider}
                    name={name}
                    image={image}
                    estimated_days={estimated_days}
                    price={price}
                    duration_terms={duration_terms}
                  />
                } 
                labelPlacement="start"
              />
            );
          })}
        </RadioGroup>
        </FormControl>
      </Fragment>
  );
}

export default Form;