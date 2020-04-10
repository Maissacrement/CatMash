// lib/app.ts
import bodyParser = require("body-parser");
import cors = require("cors");
import express = require("express");
import session = require("express-session");

// Create a new express application instance
const app: express.Application = express();

// Function
const parseAnyToNumber = (anyTypeOfValue: any): number => {
  let result: number = 0;
  const typeOfArg: string = typeof anyTypeOfValue;

  switch (typeOfArg) {
    case "string":
      result = parseInt(`${anyTypeOfValue}`, 10);

      break;
    case "number":
      result = anyTypeOfValue;

      break;
    default:
      process.stdout.write("cannot resolve this variable");
  }

  return !(result === 0) ? result : 8082;
};

// Constants
const PORT: number = parseAnyToNumber(process.env.PORT);

// My controller
import routes from "./routes/index";

// Implement CORS
app.use(cors());

// Session
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret:
      process.env.SECRET_SESSION ||
      "This secret need be never read in production",
  })
);

// Function

// Cors config
const header = (
  _: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // Set header
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
};

const listen = () => {
  process.stdout.write(`Listening on port ${PORT}!\n`);
};

// SET HEADER
app.use(header);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Path connection
app.use(routes);

app.listen(PORT, listen);
