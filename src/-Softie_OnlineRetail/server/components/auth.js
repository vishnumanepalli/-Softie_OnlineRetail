const bcrypt = require("bcrypt");
const { ErrorHandler } = require('./error');
var express = require('express');
var router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const { getUserByEmailDb, createUserDb } = require('./helper');

const { createUserDb, getUserByEmailDb, getUserByUsernameDb } = require('./helper');
const { OAuth2Client } = require('google-auth-library');

//const { getUserByEmailDb} = require('./helper');
// app.use(passport.initialize());
// app.use(passport.session());

router.post('/signup', async (req, res) => {
    try {
      const { password, email, fullname, username } = req.body;
  
      if (!email || !password || !fullname || !username) {
        throw new ErrorHandler(401, "This fields required");
      }
  
      if (validateUser(email, password)) {
        const hashedPassword = await encryptPassword(password);
  
        const userByEmail = await getUserByEmailDb(email);
        const userByUsername = await getUserByUsernameDb(username);
  
        if (userByEmail) {
          throw new ErrorHandler(401, "email taken already");
        }
  
        if (userByUsername) {
          throw new ErrorHandler(401, "username taken already");
        }
  
        const newUser = await createUserDb({
          password: hashedPassword,
          email,
          fullname,
          username,
        });
  
  
        res.status(201).json({
          user: {
            user_id: newUser.user_id,
            fullname: newUser.fullname,
            username: newUser.username,
            email: newUser.email,
          },
        });
      } else {
        throw new ErrorHandler(401, "Input validation error");
      }
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  });

router.post('/googleLogin', async (req, res) => {
    console.log("hi");
  const token = req.body.token;
  const client = new OAuth2Client(
    '84294184491-o1l9lief27ng4qak7b5hb0rd180ptr9k.apps.googleusercontent.com'
  );

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        '84294184491-o1l9lief27ng4qak7b5hb0rd180ptr9k.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;

    // Check if the user exists in the database
    const user = await getUserByEmailDb(email);
    if (user) {
        console.log("hi2");
      return res.json({ user: user });
    } else {
        console.log("hi1");
      // Create a new user if the user does not exist in the database
      const newUser = await createUserDb({
        email: email,
        fullname: name,
        username: name,
      });
      return res.json({ user: newUser });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Invalid token' });
  }
});
  
//   router.post('/googleLogin', passport.authenticate('google', { scope: ['profile', 'email'] }), (req, res) => {
//     res.redirect('/');
//   });
  
//   passport.use(new GoogleStrategy({
//     clientID: '84294184491-o1l9lief27ng4qak7b5hb0rd180ptr9k.apps.googleusercontent.com',
//     clientSecret: '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',
//     callbackURL: 'http://localhost:5000/googleLogin/callback'
//   }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         console.log("hi");
//       // Check if the user exists in the database
//       const user = await getUserByEmailDb(profile.emails[0].value);
//       if (user) {
//         return done(null, user);
//       } else {
//         // Create a new user if the user does not exist in the database
//         const newUser = await createUserDb({
//           email: profile.emails[0].value,
//           fullname: profile.displayName,
//           username: profile.displayName,
//         });
//         return done(null, newUser);
//       }
//     } catch (error) {
//       return done(error, null);
//     }
//   }));
  
//   // Serialize and deserialize the user
//   passport.serializeUser((user, done) => {
//     done(null, user.user_id);
//   });
  
//   passport.deserializeUser(async (id, done) => {
//     try {
//       const user = await getUserByIdDb(id);
//       done(null, user);
//     } catch (error) {
//       done(error, null);
//     }
//   });
  

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!validateUser(email, password)) {
        throw new ErrorHandler(403, "Invalid login");
      }
    
      const user = await getUserByEmailDb(email);
     console.log(user);
      if (!user) {
        throw new ErrorHandler(403, "Email or password incorrect.");
      }
  
      if (user.google_id && !user.password) {
        throw new ErrorHandler(403, "Login in with Google");
      }

      // roles=user.roles;
    // console.log(roles);
      const {
        password: dbPassword,
        user_id,
        roles,
        fullname,
        username,
      } = user;
  
      const isCorrectPassword = await comparePassword(password, dbPassword);
  
      if (!isCorrectPassword) {
        throw new ErrorHandler(403, "Email or password incorrect.");
      }
  
      res.json({
        user: {
          user_id,
          fullname,
          username,
          roles
        },
      });
    } catch (error) {
      console.error(error);
      res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
      });
    }
  });
  

// async function googleLogin(code) {
//   try {
//     const ticket = await this.verifyGoogleIdToken(code);
//     const { name, email, sub } = ticket.getPayload();
//     const defaultUsername = name.replace(/ /g, "").toLowerCase();

//     try {
//       const user = await getUserByEmailDb(email);
//       if (!user?.google_id) {
//         const newUser = await createUserGoogleDb({
//           sub,
//           defaultUsername,
//           email,
//           name,
//         });
//         await mail.signupMail(newUser.email, newUser.fullname.split(" ")[0]);
//       }
      // const { user_id, roles, fullname, username } =
      //   await getUserByEmailDb(email);

//       return {
//         user: {
//           user_id,
//           fullname,
//           username,
//         },
//       };
//     } catch (error) {
//       throw new ErrorHandler(error.statusCode, error.message);
//     }
//   } catch (error) {
//     console.error(error);
//     throw new Error(error.message);
//   }  
// }

function validateUser(email, password) {
  // validate email and password format
  return true;
}

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
}

async function comparePassword(plainTextPassword, hashedPassword) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
  
  module.exports = router;