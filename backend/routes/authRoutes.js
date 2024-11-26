const express = require('express');
const passport = require('passport');
const router = express.Router();

// Start the Google authentication process
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google callback route
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/', // Redirect if authentication fails
  }),
  (req, res) => {
    // Successful authentication
    res.redirect('/profile'); // Redirect to a frontend route
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Logout error');
    }
    res.redirect('/');
  });
});

module.exports = router;
