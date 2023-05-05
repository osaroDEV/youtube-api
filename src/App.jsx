import React, { useEffect, useState } from 'react';

const YOUTUBE_PLAYLIST_ITEMS_API =
  'https://www.googleapis.com/youtube/v3/playlistItems';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=PLFsfg2xP7cbL-kmqydheUCbhkHeNq-zZ_&maxResults=10&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
    )
      .then((res) => res.json())
      .then((apiData) => setData(apiData.items));
  }, []);

  const grid = data ? (
    data.map((item) => {
      console.log(data[0])
      const { id, snippet = {} } = item;
      const { title, thumbnails = {}, resourceId } = snippet;
      const { medium = {} } = thumbnails;
      return (
        <li key={id}>
          <a href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}>
            <p>
              <img
                width={medium.width}
                height={medium.height}
                src={medium.url}
                alt=''
              />
            </p>
            <h3 className='border'>{title}</h3>
          </a>
        </li>
      );
    })
  ) : (
    <p>Loading...</p>
  );

  return (
    <div>
      <h1 className='text-4xl font-bold'>Youtube API</h1>
      <ul>{grid}</ul>
    </div>
  );
};

export default App;
