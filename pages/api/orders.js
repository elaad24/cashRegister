import handler, { mysql } from "./endpoint";

export default async function orders(req, res) {
  if (req.method === "GET" && req.query.req == "getLastOrderId") {
    //http://localhost:3000/api/orders?req=getLastOrderId
    const qry = `SELECT max(order_id) as lastOrderID FROM order_history`;
    const result = await handler(mysql, qry);
    res.status(200).json({ lastOrderID: result[0].lastOrderID });
  } else if (req.method === "POST" && req.query.req == "newOrder") {
    // localhost:3000/api/orders?req=newOrder
    let qry = `SELECT max(order_id) as lastOrderID FROM order_history`;
    let result = await handler(mysql, qry);

    let lastOrderId = result[0].lastOrderID;
    let neworderId = lastOrderId + 1;
    const orderList = req.body.products;
    const payType = req.body.payType;
    let prouductsNumber = orderList.length;
    let badReq;
    var resonOfBadReq;

    let qryWithOutData = `INSERT INTO order_history (id, order_id, item_id, qty, time, price, pay_With_Cash, amount_Of_Cash, card_type) VALUES`;
    let newAddQry = qryWithOutData;

    for (let item of orderList) {
      let separator = ",";
      if (item == orderList[orderList.length - 1]) {
        separator = "";
      }

      badReq = false;
      resonOfBadReq = (() => {
        if (typeof item.item_id != "number") {
          badReq = true;
          resonOfBadReq = "error : type of item_id must be number";
          return "error : type of item_id must be number";
        } else if (typeof item.qty != "number") {
          badReq = true;
          resonOfBadReq = "error : type of qty must be number";
          return "error : type of qty must be number";
        } else if (typeof item.price != "number") {
          badReq = true;
          resonOfBadReq = "error : type of price must be number";
          return "error : type of price must be number";
        } else if (typeof payType.pay_With_Cash != "boolean") {
          badReq = true;
          resonOfBadReq = "error : type of pay_With_Cash must be Boolean";
          return "error : type of pay_With_Cash must be Boolean";
        } else if (
          payType.amount_Of_Cash != null &&
          typeof payType.amount_Of_Cash != "number"
        ) {
          badReq = true;
          resonOfBadReq =
            "error : type of amount_Of_Cash must be number or null";
          return "error : type of amount_Of_Cash must be number or null";
        }
      })();

      if (badReq) {
        break;
      }

      let addOnQry = `(NULL, ${neworderId}, ${item.item_id}, ${item.qty},
        Null,  ${item.price},
        ${payType.pay_With_Cash == true ? 1 : 0}, 
        ${payType.pay_With_Cash == true ? payType.amount_Of_Cash : null}, 
        '${payType.pay_With_Cash == false ? "credit Card" : null}')`;

      newAddQry = `${newAddQry}${addOnQry}${separator}`;
    }
    if (!badReq) {
      //call handler function
      (async () => {
        try {
          qry = newAddQry;
          console.log(qry);
          let result = await handler(mysql, qry);
          console.log(result);
        } catch (err) {
          console.log("error", err);
          console.error(err);
          throw { error: err };
        }
      })();
      res
        .status(200)
        .json({ ans: `order complete ${prouductsNumber} products  ` });
    } else {
      res.status(400).json({ error: resonOfBadReq });
    }
  } else {
    res.status(400).json({ error: "doesnt match any api req in orders" });
  }
}

// made that the for loop wil itarat the order and make one big qry ,
// need to loop trow the orderList and conjoin the objects that are the
// same and just to incrise the qry number
