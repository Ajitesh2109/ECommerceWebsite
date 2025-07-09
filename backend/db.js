import mssql from "mssql";

const config = {
  user: "ecommerce_user",
  password: "ronniejojo",
  server: "127.0.0.1",
  instanceName: "SQLEXPRESS",
  database: "EComWebsiteDB",
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
