const adminAuthMiddleware = (req, res, next) => {
    const user = req.user;
  
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You must be an administrator to access this route."
      });
    }

    next();
};
  
module.exports = adminAuthMiddleware;