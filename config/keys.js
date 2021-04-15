// add this file to .gitignore

module.exports = {
    mongodb: {
      dbURI:
        // "mongodb+srv://varun:varun123@cluster0.q4zuc.mongodb.net/passportjs?retryWrites=true",
      "mongodb+srv://admin:admin123@cluster0.i5gbr.mongodb.net/todo?retryWrites=true"
    },
    CLIENT_HOME_PAGE_URL: "http://localhost:3000/",
    // CLIENT_HOME_PAGE_URL: "https://agribazzar.herokuapp.com/",
    token: { TOKEN_SECRET: "myTokenSecret" },
  };