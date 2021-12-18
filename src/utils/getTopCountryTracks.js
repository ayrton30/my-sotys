export const getTopCountryTracks = (accessToken, country) => {
  //busqueda de playlist con las canciones populares del pais
  let q = `spotify%20top%2050%20${country}`;

  const response = fetch(
    `https://api.spotify.com/v1/search?q=${q}&type=playlist&limit=1`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      let playlist = data.playlists.items[0].tracks.href;

      //Get Playlist Items
      return fetch(
        `${playlist}?fields=items(track(id%2C%20album%2C%20name%2Cartists(name)))`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    });

  return response;
};
