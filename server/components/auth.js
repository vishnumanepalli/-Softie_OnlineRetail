const bcrypt = require('bcrypt');
const { ErrorHandler } = require('../helpers/error');
const { createUserDb, getUserByEmailDb, getUserByUsernameDb, createCartDb, createUserGoogleDb } = require('../repositories/userRepository');

async function signUp({ password, email, fullname, username }) {
  try {
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

      const { id: cart_id } = await createCartDb(newUser.user_id);

      return {
        user: {
          user_id: newUser.user_id,
          fullname: newUser.fullname,
          username: newUser.username,
          email: newUser.email,
        },
      };
    } else {
      throw new ErrorHandler(401, "Input validation error");
    }
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
}

async function login(email, password) {
  try {
    if (!validateUser(email, password)) {
      throw new ErrorHandler(403, "Invalid login");
    }

    const user = await getUserByEmailDb(email);

    if (!user) {
      throw new ErrorHandler(403, "Email or password incorrect.");
    }

    if (user.google_id && !user.password) {
      throw new ErrorHandler(403, "Login in with Google");
    }

    const {
      password: dbPassword,
      user_id,
      roles,
      cart_id,
      fullname,
      username,
    } = user;

    const isCorrectPassword = await comparePassword(password, dbPassword);

    if (!isCorrectPassword) {
      throw new ErrorHandler(403, "Email or password incorrect.");
    }

    return {
      user: {
        user_id,
        fullname,
        username,
      },
    };
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
}

async function googleLogin(code) {
  try {
    const ticket = await this.verifyGoogleIdToken(code);
    const { name, email, sub } = ticket.getPayload();
    const defaultUsername = name.replace(/ /g, "").toLowerCase();

    try {
      const user = await getUserByEmailDb(email);
      if (!user?.google_id) {
        const newUser = await createUserGoogleDb({
          sub,
          defaultUsername,
          email,
          name,
        });
        await createCartDb(newUser.user_id);
        await mail.signupMail(newUser.email, newUser.fullname.split(" ")[0]);
      }
      const { user_id, cart_id, roles, fullname, username } =
        await getUserByEmailDb(email);

      return {
        user: {
          user_id,
          fullname,
          username,
        },
      };
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  } catch (error) {
    throw new ErrorHandler(401, error.message);
  }
}

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
  
