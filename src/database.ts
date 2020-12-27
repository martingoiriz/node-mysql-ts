import mysql from "mysql";

// For test, I'm using MySQL server and MySQL Workbench for macOS
// recomended by this guide:
// https://medium.com/macoclock/mysql-on-mac-getting-started-cecb65b78e

let db_config = {
  connectionLimit: 100,
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "sys"
};

const mysqlConnection = mysql.createConnection(db_config);

mysqlConnection.connect(function(err) {
  if (err) {
    console.log("Error getting mysql_pool connection: " + err);
    throw err;
  } else {
    console.log("DB connected");
  }
});

// * It migth exist the case where you will need to create a pool connection, then use: *
// const mysqlConnection = mysql.createPool(db_config);
// mysqlConnection.getConnection(function(err, connection) {
//   if (err) {
//     connection.release();
//     console.log("Error getting mysql_pool connection: " + err);
//     throw err;
//   } else {
//     console.log("DB connected");
//   }
// });

export default mysqlConnection;
