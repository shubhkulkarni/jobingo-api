const { connect } = require("mongoose");

const URI = process.env.DB;

connect(URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.log("Database connection successful !");
});
