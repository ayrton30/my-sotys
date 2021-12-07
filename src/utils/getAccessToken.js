const CLIENT_ID = "ca72fefebd99434c911edafb2a3cfe4b";
const CLIENT_SECRET = "1187a6b41e244cc5943f4e8047bfd76a";

export const getAccessToken = () => {
  const response = fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },

    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    json: true,
  });
  return response;
};
