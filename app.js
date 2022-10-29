const express = require("express");
const app = express();
app.use(express.json());

const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const path = require("path");
const db_path = path.join(__dirname, "userData.db");

let db = null;

const initializeDbAndServer = async () => {
  db = await open({ filename: db_path, driver: sqlite3.Database });
  app.listen(3000, () => {
    try {
      console.log("server running at http://localhost:3000");
    } catch (error) {
      console.log(`DB ERROR ${error.message}`);
      process.exit(1);
    }
  });
};
initializeDbAndServer();

const checkUser = async (userName) => {
  try {
    const Query = `
        SELECT
            *
        FROM
            user
        WHERE
            username="${userName}";`;
    const response = db.get(Query);
    console.log(response);
    return false;
  } catch (error) {
    console.log(`ERROR ${error.message}`);
  }
};

//API 1 POST
app.post("/register", async (request, response) => {
  try {
    const userDetails = request.body;
    const { username } = userDetails;
    if (checkUser(username)) {
    } else {
      response.send("User already exists");
    }
  } catch (error) {
    console.log(`ERROR API ${error.message}`);
  }
});
