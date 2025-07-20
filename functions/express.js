const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

router.get("/test", (req, res) => {
    res.send("This is /test endpoint.");
});

app.use("/.netlify/functions/express", router);

module.exports.handler = serverless(app);