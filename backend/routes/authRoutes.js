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
    res.redirect('/food-items'); // Redirect to the list of food items
  }
);

router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('req.user:', req.user); // Log to inspect the structure
    // Return user information stored in the session
    res.json({
      name: req.user.name,
      email: req.user.email,
      picture: req.user.profilePicture,
    });
  } else {
    res.status(401).json({ error: 'User not authenticated' });
  }
});

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
