const e = require("cors");
var dotenv = require("dotenv");
dotenv.config();

let ssl;
let frontendUrl;
let apiURL;
let adminFrontendUrl = process.env.AUTH_BASE_URL;
if (process.env.NODE_ENV === "local") {
  ssl = "http://";
  frontendUrl = "localhost:3000/";
  apiURL = "http://localhost:4000/";
}

if (process.env.NODE_ENV === "development") {
  ssl = "https://";
  frontendUrl = "localhost:3000/";
  apiURL = `${process.env.REACT_APP_API_URL}/`;
}

module.exports = {
  MAIL_AUTH_USER: "",
  MAIL_AUTH_PASS: "",
  S3_PROJECT_THUMBNAIL_BUCKET: "",
  S3_BASE_URL: "",
  S3_ACCESS_KEY: "",
  S3_SECRET_KEY: "",

  NODE_ENV: process.env.NODE_ENV,

  //   awsContentImageUrl: "https://workybooks.s3.us-west-1.amazonaws.com/THUMBS/",

  aWSBucket: {
    development: { bucketName: "", s3BaseURL: "" },
    documentDirectory: "",
    subjectDirectory: "",
    region: "",
  },

  SMTPConfig: {
    EMAIL: "info@geolocation.com",
    PASSWORD: process.env.EMAIL_PWD, // Here Password is master key from smtp
    HOST: "smtp.ionos.com",
    PORT: 587,
    FROM_EMAIL: "no-reply@geoloation.com",
  },

  ssl,
  frontendUrl,
  apiURL,
  adminFrontendUrl,
};
