const express = require ("express");
const { renderToString } = require ("react-dom/server");
const SSR = require ("./static");

const app = express ();
app.use (express.static ("static"));
app.get ("/", (req, res) =>
    res.status (200).send (renderMarkup (renderToString(SSR)))
);
app.listen (parseInt (process.env.PORT, 10) || 8080);

function renderMarkup (html)
{
    return `<!DOCTYPE html>
<html lang="en">
  <head><title>SSR Demo</title><meta charset="utf-8" /></head>
  <body>
    <div id="app">${html}</div>
    <script src="./index.js"></script>
  </body>
</html>`;
}

// End of server.js
