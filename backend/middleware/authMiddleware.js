const ensureAuthenticated = (req, res, next) => {
    console.log(`Authentication middleware hit: ${req.isAuthenticated ? 'Authenticated' : 'Not authenticated'}`);
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'User not authenticated' });
};

module.exports = ensureAuthenticated;
