import React from 'react';

import { 
  Typography, 
  Paper,
  TextField,
  FormControl,
  InputLabel,
  NativeSelect,
  Button,
} from '@material-ui/core';

const ReviewForm = props => {
  const {
    inputs,
    handleChange,
    onSubmit,
    formTitle,
    submitLabel,
    editMode,
    onCancel,
  } = props;

  const ratingKey = editMode ? 'editRating' : 'rating';

  return (
    <Paper style={{width:'100%'}}>
      <div style={{marginTop:10, marginLeft:10}}>
        <Typography variant="title">{formTitle}</Typography>
      </div>
      <div style={{margin:10}}>
        <FormControl width={"100%"}>
          <InputLabel>Rating</InputLabel>
          <NativeSelect
            defaultValue={5}
            onChange={({target: {value}}) => handleChange( ratingKey, value)}
          >
            {[...Array(5)].map((el,i) => (
              <option value={i + 1}>{i + 1}</option>
            ))}
          </NativeSelect>
        </FormControl>
      </div>
      {inputs.map((input) => (
        <div style={{margin:10, marginTop:0}}>
          <TextField
            id="outlined-multiline-flexible"
            label={input.label}
            multiline
            rowsMax="4"
            value={input.value}
            onChange={({target: {value}}) => handleChange(input.key, value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </div>
      ))}
      <div style={{margin:10, marginTop:0}}>
        <Button 
          variant="outlined" 
          fullWidth={true}
          onClick={onSubmit}
        >
           {submitLabel}
        </Button>
      </div>
      {editMode &&
        <div style={{margin:10, marginTop:0}}>
          <Button 
            variant="outlined" 
            fullWidth={true}
            onClick={onCancel}
          >
            cancel
          </Button>
        </div>
      }
    </Paper>
  );
}

export default ReviewForm;