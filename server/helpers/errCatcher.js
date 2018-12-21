module.exports = {
  createUserErr: (err) => {
    const errMessage = err.toString();
    
    if (errMessage.indexOf("is shorter than the minimum allowed length") !== -1) {
      return "password length must be at least 5";
    } else if ( errMessage.indexOf("MongoError: E11000 duplicate key error collection") !== -1) {
      return "email is already used by another user";
    } else {
      return "password combination is invalid";
    }
  }
}
