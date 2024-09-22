import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://bhagavad-gita3.p.rapidapi.com/v2/chapters/";

app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.get("/link", async (req, res) => {
    try {
        const options = await axios.get(API_URL, {
          headers: {
            'x-rapidapi-key': 'c1b4058f3fmshbb797d54a5a06aep1fcbfcjsnfd96c57787ca',
            'x-rapidapi-host': 'bhagavad-gita3.p.rapidapi.com'
          }
        });
    
        const index = parseInt(req.query.index, 10);
        const chapterData = options.data[index];
        res.render("link.ejs", { 
            summary: chapterData.chapter_summary,
            summary_hindi: chapterData.chapter_summary_hindi, 
        }); 
      } 
      catch (error) {
        console.log(error.response.data);
        res.status(500).send('Error fetching data');
      }
});

app.listen(port, () => {
    console.log(`Listening on Port ${port}.`);
});