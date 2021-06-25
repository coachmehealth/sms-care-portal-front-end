const express = require("express");
const path = require("path");
const app = express();
function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for ALBs or proxies like on Aptible, GcP, etc
  if (
    !req.secure &&
    req.get("x-forwarded-proto") !== "https" &&
    process.env.NODE_ENV !== "development"
  ) {
    return res.redirect("https://" + req.get("host") + req.url);
  }
  next();
}

app.use(requireHTTPS);
app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

console.log("Serving build directory on port 3000");
app.listen(3000);
