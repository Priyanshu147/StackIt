/* import https from "https";
//import http from "http";
import fs from "fs";
import app from "./app.js";
import { config } from "dotenv";
config();

const PORT = process.env.PORT || 8000;

// Load SSL certificate and key
const sslOptions = {
  key: fs.readFileSync(process.env.SSL_KEY_FILE '),
  cert: fs.readFileSync(process.env.SSL_CRT_FILE ')
};

// Start HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`🚀 HTTPS Server listening on https://localhost:${PORT}`);
});
 */


import http from "http";
import app from "./app.js";
import { config } from "dotenv";
config();

const PORT = process.env.PORT || 8000;

// Start HTTPS server
http.createServer(app).listen(PORT, () => {
  console.log(`🚀 HTTP Server listening on http://localhost:${PORT}`);
});
