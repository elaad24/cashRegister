import http from "./http";
import { apiURL } from "./urlEndPoint.json";

// get sum of money from orders from last 24 hours
export async function getTotalMoneyLast24Hours() {
  return await http.get(`${apiURL}stats?req=totalMoneyLast24Hours`);
}

// to get top 10 sold items and there amounts
export async function getTopSoldItems() {
  return await http.get(`${apiURL}stats?req=TopSoldItems`);
}

// to get the amount of sold items
export async function getSoldItems() {
  return await http.get(`${apiURL}stats?req=SoldItems`);
}

// to get the amount of deal that had with cash and the amount and
// the amount of deals that were with credit  cartd and the amount
export async function getDealsDataInfo() {
  return await http.get(`${apiURL}stats?req=dealsDataInfo`);
}
