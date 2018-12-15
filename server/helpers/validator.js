module.exports = {
  hasValidEmail: (email) => {
    const validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validEmail.test(email);
  },
  hasValidPassword: (password) => {
    const hasNumber = /\d/;
    const hasSpecialChar = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const hasLowercase = /[a-z]/;
    const hasUppercase = /[A-Z]/;

    return hasNumber.test(password) && hasSpecialChar.test(password)
      && hasLowercase.test(password) && hasUppercase.test(password);
  }
};
