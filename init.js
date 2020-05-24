const app = require("./app");
const dbSync = require("./utile/db");
const dotenv = require('dotenv');
dotenv.config();

dbSync().then(() => {
    console.log('Sync Database..');
    app.listen(4333, () => {
        console.log("server start port 4333");
    });
});



