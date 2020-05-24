const app = require("./app");
const dbSync = require("./utile/db");
const dotenv = require('dotenv');
dotenv.config();
const PORT = 8320
dbSync().then(() => {
    console.log('Sync Database..');
    app.listen(PORT, () => {
        console.log("server start port ," + PORT);
    });
});



