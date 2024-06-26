/**
 * @desc check on session authentication
 * @route GET api/v1/session/
 * @access public
 */
const checkStatus = (req, res, next) => {
  try {
    //if-else to determine status code based on authorization
    if (req.isAuthenticated()) {
      res.status(200).json({
        isAuthenticated: req.isAuthenticated(),
        id: req.user.id,
        user: req.user,
        status: 200,
      });
    } else {
      res.status(401).json({
        isAuthenticated: req.isAuthenticated(),
        id: null,
        user: null,
        status: 401,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { checkStatus };
