require("dotenv").config(); // Load environment variables

const flash = require("express-flash");
const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const connectDB = require("./server/config/db");
const { isActiveRoute } = require("./server/helpers/routeHelpers");
const User = require("./server/models/User");
const Comment = require("./server/models/Comment");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(flash());

// Session configuration
app.use(
  session({
    secret: process.env.SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI, // Ensure this is correct
    }),
    cookie: { maxAge: 1000 * 60 * 24 },
  }),
);

// Passport configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          // Create a new user if they don't exist
          user = await User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            password: "oauth-user", // Placeholder password for OAuth users
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(passport.initialize());
app.use(passport.session());

// Static files
app.use(express.static("public"));

// Templating engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.locals.isActiveRoute = isActiveRoute;

// Routes
app.use("/", require("./server/routes/main"));
app.use("/", require("./server/routes/admin"));

// OAuth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user;
    req.flash("success", "Logged in sucessfully!");
    res.redirect("/");
  },
);

// Render the login page
app.get("/login", (req, res) => {
  res.render("login", {
    locals: {
      title: "Login",
      description: "Login to your account",
    },
    layout: "./layouts/main", // Use the main layout
  });
});

// Render the registration page
app.get("/register", (req, res) => {
  res.render("register", {
    locals: {
      title: "Register",
      description: "Create a new account",
    },
    layout: "./layouts/main", // Use the main layout
  });
});

// User Registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    req.session.user = user; // Store user in session
    req.flash("success", "Registration successful! Please log in."); // Flash message
    res.redirect("/login"); // Redirect to the login page after registration
  } catch (error) {
    console.error(error);
    req.flash("error", "Error registering user"); // Flash message
    res.redirect("/register"); // Redirect back to the registration page
  }
});

// User Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      req.flash("error", "Invalid credentials"); // Flash message
      return res.redirect("/login");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      req.flash("error", "Invalid credentials"); // Flash message
      return res.redirect("/login");
    }

    req.session.user = user; // Store user in session
    req.flash("success", "Logged in successfully!"); // Flash message
    res.redirect("/"); // Redirect to home page
  } catch (error) {
    console.error(error);
    req.flash("error", "Error during login"); // Flash message
    res.redirect("/login"); // Redirect back to the login page
  }
});

// Comment Submission
app.post("/comment", async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login"); // Redirect to login page if not logged in
  }

  const { postId, content } = req.body;
  try {
    const comment = await Comment.create({
      postId,
      userId: req.session.user._id,
      content,
    });
    res.redirect(`/post/${postId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving comment");
  }
});

// Fetch Comments for a Post
app.get("/post/:id/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id }).populate(
      "userId",
    );
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching comments");
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
