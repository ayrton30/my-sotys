export const getTracks = (accessToken, search, actualYear) => {
  let q = search.replace(" ", "%20");

  //solo muestro las canciones lanzados en el año actual
  q = `${q}+year:${actualYear}`;

  console.log(accessToken);

  const response = fetch(
    `https://api.spotify.com/v1/search?q=${q}&type=track&limit=10`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};
