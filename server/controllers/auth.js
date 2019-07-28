const userAction = require('../actions/user.action');
const { statusCode, errMessage, successMessage } = require('../helpers/httpResponse');

const register = async (req, res) => {
  try {
    const {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      password_repeat: passwordRepeat,
    } = req.body;

    await userAction.create(firstName, lastName,
      email, password, passwordRepeat);

    return res.status(statusCode.created).json({
      message: successMessage.USER_HAS_BEEN_CREATED,
    });
  } catch (e) {
    return res.status(statusCode.badRequest).json({
      message: e.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userAction.login(email, password);
    return res.status(statusCode.ok).json({
      ...result,
      message: successMessage.LOGIN,
    });
  } catch (e) {
    return res.status(statusCode.badRequest).json({
      message: e.message,
    });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.decoded;
    const result = await userAction.findUserInfoById(userId);
    return res.status(statusCode.ok).json({
      user: result,
      message: successMessage.FETCH_USER_INFO,
    });
  } catch (e) {
    return res.status(statusCode.unauthorized).json({
      message: errMessage.INVALID_TOKEN,
    });
  }
};

module.exports = {
  register,
  login,
  getUserInfo,
};
