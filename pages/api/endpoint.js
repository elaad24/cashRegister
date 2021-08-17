import nextConfig from "../../next.config";
import serverlessMysql from "serverless-mysql";

export const mysql = serverlessMysql({
  config: {
    host: nextConfig.env.MYSQL_HOST,
    database: nextConfig.env.MYSQL_DATABASE,
    user: nextConfig.env.MYSQL_USER,
    password: nextConfig.env.MYSQL_PASSWORD,
  },
});

/* const mysql = require("serverless-mysql")({
  config: {
    host: nextConfig.env.MYSQL_HOST,
    database: nextConfig.env.MYSQL_DATABASE,
    user: nextConfig.env.MYSQL_USER,
    password: nextConfig.env.MYSQL_PASSWORD,
  },
}); */

// Main handler function
export default async function handler(mysql, qry, req, res) {
  await mysql.connect();
  // Run your query
  let results = await mysql.query(qry);
  // console.log(results);
  // Run clean up function
  await mysql.end();

  return results;
  // Return the results
  return results;
}
