module.exports = {
  createUserErr: (err) => {
    const errMessage = err.toString();

    if (errMessage.indexOf('is shorter than the minimum allowed length') !== -1) {
      return 'password length must be at least 5';
    }
    if (errMessage.indexOf('MongoError: E11000 duplicate key error collection') !== -1) {
      return 'email is already used by another user';
    }
    if (errMessage.indexOf('ValidationError: first_name: first name is required, last_name: last name is required') !== -1) {
      return 'first name and last name are required';
    }
    if (errMessage.indexOf('Error: invalid email') !== -1) {
      return 'email is required';
    }
    return 'password combination is invalid';
  },
};
