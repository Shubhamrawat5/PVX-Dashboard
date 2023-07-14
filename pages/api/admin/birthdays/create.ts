// pages/api/myApi.js

export default function handler(req, res) {
  const apiData = { message: 'Hello from the API!' };

  res.status(200).json(apiData);
}
