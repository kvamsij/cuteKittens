const app = require('./src/app');
const sequelize = require('./src/dbconfig/database');
const PORT = 3000;

sequelize.sync();

app.listen(PORT, () => {
    console.log(`Cute kittens api is running on port: ${PORT}`);
});