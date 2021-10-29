import handler, { mysql } from "./endpoint";

export default async function stats(req, res) {
  if (
    // get sum of money from orders from last 24 hours
    req.method === "GET" &&
    req.query.req == "totalMoneyLast24Hours"
  ) {
    //http://localhost:3000/api/stats?req=totalMoneyLast24Hours

    const time_now = Date.now() / 1000;
    const time_24_hours_ago = time_now - 86400;

    const qry = `SELECT SUM(price) as total FROM order_history WHERE UNIX_TIMESTAMP(time) BETWEEN ${time_24_hours_ago} and ${time_now}`;
    const result = await handler(mysql, qry);
    res.status(200).json({ result: result[0].total });
  } else if (
    // to sold items and there amounts
    req.method === "GET" &&
    req.query.req == "TopSoldItems"
  ) {
    //http://localhost:3000/api/stats?req=TopSoldItems

    const qry = `SELECT products.name,count(item_id) as amount FROM order_history inner JOIN products ON order_history.item_id= products.id GROUP BY item_id ORDER BY COUNT(item_id) DESC`;
    const result = await handler(mysql, qry);
    res.status(200).json({ result });
  } else {
    res.status(400).json({ error: "doesnt match any api req in stats" });
  }
}
