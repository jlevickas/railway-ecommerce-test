import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";

// Use passport-local strategy for login and register actions
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          // Return false if user doesn't exist
          return done(null, false);
        }
        // Compare password
        const correctPassword = await user.comparePassword(password);
        if (!correctPassword) {
          // Return false if password is incorrect
          return done(null, false);
        }
        // Return user if login is successful
        return done(null, user);
      } catch (error) {
        // Return error if there's an issue with the request
        return done(error);
      }
    }
  )
);

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // Check if user with provided email already exists
        const existingUser = await User.findOne({ email });
        console.log(existingUser);
        if (existingUser) {
          // Return false if user already exists
          return done(null, false);
        }
        // Create new user
        const user = new User({ email, password });
        await user.save();
        // Return new user
        return done(null, user);
      } catch (error) {
        // Return error if there's an issue with the request
        return done(error);
      }
    }
  )
);

// Serialize user
passport.serializeUser((user, done) => {
  // Store user ID in session
  done(null, user._id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    // Find user by ID and exclude password
    const user = await User.findById(id).select("-password");
    // Return user
    done(null, user);
  } catch (error) {
    // Return error if there's an issue with the request
    done(error);
  }
});

export default passport;
