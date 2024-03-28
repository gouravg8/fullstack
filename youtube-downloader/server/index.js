import express from "express";
import ytdl from "ytdl-core";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.get("/", async (req, res) => {
  const ytUrl = "http://www.youtube.com/watch?v=aqz-KE-bpKQ";
  //   const out = ytdl("http://www.youtube.com/watch?v=aqz-KE-bpKQ").pipe(
  //     fs.createWriteStream("out/video.mp4")
  //   );
  let info = await ytdl.getInfo(ytUrl);
  console.log(info);
  res.send(info);
});

app.post("/", async (req, res) => {
  let { inputUrl } = req.body;
  if (ytdl.validateURL(inputUrl)) {
    let info = await ytdl.getInfo(inputUrl);
    res.send(info);
  } else {
    res.send("invalid url");
  }
});

app.listen(port, () => {
  console.log(`FullStack app listening on port ${port}`);
});
