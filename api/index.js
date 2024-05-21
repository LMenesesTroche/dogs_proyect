const server = require('./src/app.js');// we get the server from app.js
const { conn } = require('./src/db.js');// this is the many to many connection from db.js
const port = 3001;//Our port
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {//TODO if this is on true every reset on the server will erase all the data from the data base
  server.listen(port, () => {
    console.log(`listening at ${port} `); // eslint-disable-line no-console
  });
});
