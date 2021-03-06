/**
  * This code is from General Assembly
  * https://git.generalassemb.ly/wdi-nyc-60/user_auth_itunes
*/


/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */

const express             = require('express');
const { createUser }      = require('../models/user.js');
const { authenticate }    = require('../lib/auth');
const fav                 = require('../models/fav');

const usersRouter  = express.Router();

/**
 * Creates a new user by handling the POST request from a form with action `/users`
 * It uses the createUser middleware from the user model
 */
usersRouter.post('/', createUser, (req, res) => {
  res.redirect('/');
});

/**
 * Takes the user to its profile by handling any GET request to `/users/profile`
 * It redirects to /login when attempted to be reached by a non logged in user
 * It is "protected" by the authenticate middleware from the auth library
 */
// usersRouter.get('/profile', authenticate, (req, res) => {
//   res.render('users/profile', { user: res.user });
// });


usersRouter.get('/profile', authenticate, fav.getFav, (req, res) => {
  res.render('users/profile', {
    results   : res.results || [],
    fav       : res.favorites || [],
    user      : res.user,
  });
});

usersRouter.post('/profile', fav.saveFav, (req, res) => {
  res.redirect('/users/profile');
});

usersRouter.delete('/profile/:id', fav.deleteFav, (req, res) => {
  res.redirect('/users/profile');
});

module.exports = usersRouter;
