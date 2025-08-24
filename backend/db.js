import mssql from "mssql";

const config = {
  user: "ajitesh2109_EComWebsite",
  password: "r0nniej0j0",
  server: "sql.bsite.net\\MSSQL2016",
  database: "ajitesh2109_EComWebsite",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const pool = new mssql.ConnectionPool(config);
const poolConnect = pool
  .connect()
  .then(() => console.log("MSSQL Connected"))
  .catch((err) => console.error("DB Connections Failed", err));

export { mssql, pool, poolConnect };
