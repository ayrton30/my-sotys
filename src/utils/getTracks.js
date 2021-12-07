export const getTracks = (accessToken, search) => {
  const q = search.replace(" ", "%20");
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
