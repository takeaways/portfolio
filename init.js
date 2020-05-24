const app = require("./app");
const dbSync = require("./utile/db");
const dotenv = require('dotenv');
dotenv.config();

dbSync().then(() => {
    console.log('Sync Database..');
    app.listen(2080, () => {
        console.log("server start port 2080");
    });
});



