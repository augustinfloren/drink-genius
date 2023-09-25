const express = require('express');

//récupération du router
const router = require("./app/services/router");

const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');

app.use(express.static(__dirname + '/static'));

// on utlise le router
 app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});