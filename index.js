import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res) => {
    res.render("index.ejs",{
        joke:null,
        name: null
    });
})

app.post("/post", async (req, res) => {
  try {
    const name = req.body.name;
    const encodedName = encodeURIComponent(name);
    const response = await axios.get(`https://v2.jokeapi.dev/joke/Any?type=single&replace-name=${encodedName}`);
    const joke = response.data.joke;

    res.render("index.ejs", {
      name: name,
      joke: joke
    });

  } catch (error) {
    console.log("Unable to fetch joke", error.message);
    res.render("index.ejs", {
      joke: "Unable to load joke",
      name: req.body.name
    });
  }
});

app.listen(port,()=>{
    console.log(`This server is running on ${port}`);
})