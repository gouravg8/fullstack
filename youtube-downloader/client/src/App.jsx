import { useState } from "react";
import "./App.css";
import propTypes from "prop-types";
import axios from "axios";
import AtomicSpinner from "atomic-spinner";

function App() {
  const [data, setData] = useState([]);
  const [inpUrl, setInpUrl] = useState("");
  const [loading, setLoading] = useState(true);

  async function handleClick() {
    if (!inpUrl) {
      alert("Please enter URL");
      return;
    }
    try {
      const res = axios.post("http://localhost:3000/", {
        inputUrl: inpUrl,
      });
      setData((await res).data.formats);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        action="/"
        method="post"
        className="dark:text-white flex flex-col justify-center items-center w-2/3 mx-auto my-24 gap-3"
      >
        <input
          onChange={(e) => setInpUrl(e.target.value)}
          value={inpUrl}
          className="w-full md:w-1/2 border border-white px-2 py-1 rounded placeholder:text-sm bg-gray-800"
          type="text"
          name="inputUrl"
          id="inputUrl"
          placeholder="Enter URL"
        />
        <button
          className="w-fit mx-auto rounded text-white text-sm  px-4 py-2 bg-orange-500"
          id="download"
          onClick={handleClick}
        >
          Download
        </button>
      </form>

      <div className="w-2/3 md:w-1/3 flex flex-col justify-center mx-auto text-white">
        {loading && (
          <div className="traslate-x-1/2 mx-auto">
            <AtomicSpinner atomSize={150} electronsPerPath={3} />
          </div>
        )}

        {data.length > 0 && <h2 className="font-semibold">Videos</h2>}
        <ul className="flex m-2 flex-wrap gap-2">
          <Video data={data} />
        </ul>

        {data.length > 0 && <hr className="my-4 bg-white text-white " />}

        {data.length > 0 && <h2 className="font-semibold">Audios</h2>}
        <ul className="flex m-2 flex-wrap gap-2">
          <Audio data={data} />
        </ul>
      </div>
    </>
  );
}

const Video = ({ data }) => {
  return (
    <>
      {data
        .filter(
          (item) =>
            item.hasVideo === true &&
            item.hasAudio === true &&
            item.container === "mp4"
        )
        .sort((a, b) => a.height - b.height)
        .map((item) => (
          <a
            key={item.id}
            className="border rounded px-2 py-1 text-sm"
            download={item.title}
            href={item.url}
            // target="_blank"
          >
            {item.qualityLabel}
          </a>
        ))}
    </>
  );
};

const Audio = ({ data }) => {
  return (
    <>
      {data
        .filter((item) => item.hasAudio === true && item.hasVideo === false)
        .sort((a, b) => a.audioBitrate - b.audioBitrate)
        .map((item) => (
          <a
            key={item.id}
            className="border rounded px-2 py-1 text-sm"
            download={item.title}
            href={item.url}
            // target="_blank"
          >
            {item.audioBitrate}kbps
          </a>
        ))}
    </>
  );
};

Video.propTypes = {
  data: propTypes.array,
};

Audio.propTypes = {
  data: propTypes.array,
};

export default App;
