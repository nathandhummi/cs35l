const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // If the user is authenticated, proceed
    }
    res.status(401).json({ error: 'User not authenticated' });
};

module.exports = ensureAuthenticated;
