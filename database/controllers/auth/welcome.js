const welcome = (req, res) => {
  res.status(200).send("Welcome to Greddits API");
}

module.exports = welcome;