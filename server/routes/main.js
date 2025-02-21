const Comment = require("../models/Comment");
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const marked = require("marked");
const hljs = require("highlight.js");
const nodemailer = require("nodemailer");
const emailQueue = require("../queue/emailQueue");

marked.setOptions({
  highlight: function (code, language) {
    const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
    return hljs.highlight(code, { language: validLanguage }).value;
  },
});

//Routes
/**
 * GET /
 * HOME
 */

router.get("", async (req, res) => {
  try {
    const locals = {
      title: "Anurag's Blog",
      description: "A great blog for intersting stuff.",
    };
    let perPage = 10;
    let page = parseInt(req.query.page) || 1;

    if (isNaN(page) || page < 1) {
      page = 1;
    }

    const posts = await Post.find()
      .select("title createdAt")
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean();

    const count = await Post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data: posts,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: "/",
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).render("error", { message: "Internal Server Error" });
  }
});

/**
 *  GET /
 *  Post :id
 */

router.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    // Fetch comments for the post
    const comments = await Comment.find({ postId: req.params.id }).populate(
      "userId",
    );

    // Render Markdown content
    const contentHtml = marked.parse(post.body);

    // Render the post template with the post and comments
    res.render("post", {
      locals: {
        title: post.title,
        description: "Simple Blog Created with NodeJS",
      },
      data: {
        ...post._doc,
        body: contentHtml,
        comments: comments, // Pass comments to the template
      },
      currentRoute: `/post/${req.params.id}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
/**
 *  GET /
 *  Post :serachTerm
 */

router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Simple blog created with node js",
    };

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      data,
      locals,
      currentRoute: "/",
    });
  } catch (error) {
    console.log(error);
  }
});
/**
 * GET /
 * About
 */
router.get("/about", (req, res) => {
  res.render("about", {
    currentRoute: "/about",
  });
});

router.get("/contact", (req, res) => {
  res.render("contact", {
    currentRoute: "/contact",
  });
});

// POST /contact - Handle contact form submission
router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Validate form data
  if (!name || !email || !message) {
    return res.status(400).send("All fields are required.");
  }

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use Gmail as the email service
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
  });

  // Email options
  const mailOptions = {
    from: email, // Sender's email
    to: process.env.EMAIL_USER, // Your email address
    subject: `New Message from ${name}`, // Email subject
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Email body
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).send("Message sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send message.");
  }
});

// routes/main.js
const cache = require("../middleware/cache");

router.get("/", cache("homepage"), async (req, res) => {
  const posts = await Post.find().lean();
  res.json(posts);
});

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  await emailQueue.add({ name, email, messgae });
  res.status(200).send("Message sent successfully!");
});

module.exports = router;
