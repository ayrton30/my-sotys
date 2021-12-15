export const getAccessToken = (spotifyData) => {
  const response = fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },

    body: `grant_type=client_credentials&client_id=${spotifyData.CLIENT_ID}&client_secret=${spotifyData.CLIENT_SECRET}`,
    json: true,
  });
  return response;
};
