const app = require("./app");
const dbSync = require("./utile/db");
const dotenv = require('dotenv');
dotenv.config();

dbSync().then(() => {
    console.log('Sync Database..');
    app.listen(7000, () => {
        console.log("server start port 7000");
    });
});



