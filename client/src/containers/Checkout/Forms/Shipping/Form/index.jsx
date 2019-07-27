import React from 'react';

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
    chosenRateIndex,
  } = props;
    
  return (
    <FormControl className={classes.container}>
      <RadioGroup
        aria-label="shipping"
        name="shipping"
        className={classes.group}
        value={chosenRateIndex}
        onChange={({target: {value}}) => handleChange('chosenRateIndex', Number(value))}
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
              control={<Radio checked={chosenRateIndex === i}/>} 
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
  );
}

export default Form;