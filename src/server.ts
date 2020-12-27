import express from "express";
// == Routes
import subscriptor from "./routes/subscriptor";
import newsLetter from "./routes/newsLetter";

const app = express();

// ==== Settings ====
app.set("port", 3000);

// ==== Middlewares ====
app.use(express.static("public"));
app.use(express.json());
app.use(function(req: any, res: any, next: any) {
  // Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, contentType, Content-Type, Accept, Authorization"
  );
  next();
});

// ==== Routes ====
app.use(subscriptor);
app.use(newsLetter);

app.listen(3000, () => console.log("Server Started on port", app.get("port")));
