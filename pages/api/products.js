import handler, { mysql } from "./endpoint";

export default async function products(req, res) {
  if (
    // to remove item ONLY ADMIN CAN
    req.method === "DELETE" &&
    req.query.req == "removeItem" &&
    req.query.productID != undefined &&
    (req.headers.cookie.split(";").indexOf(`adminRequest=true`) >= 0 ||
      req.headers.cookie.split(";").indexOf(` adminRequest=true`) >= 0)
  ) {
    console.log(req.method);
    /* only admin can do this  */

    //http://localhost:3000/api/products?req=removeItem&productID=NUMBER
    // remove item with it's product id
    const qry = `DELETE FROM products WHERE products.id = ${req.query.productID}`;
    const result = await handler(mysql, qry);
    console.log(result);
    res.status(200).json({
      and: "item deleted",
    });
  } else if (
    // to add new item ONLY ADMIN CAN
    req.method === "POST" &&
    req.query.req == "addProduct" &&
    (req.headers.cookie.split(";").indexOf(`adminRequest=true`) >= 0 ||
      req.headers.cookie.split(";").indexOf(` adminRequest=true`) >= 0)
  ) {
    /* only admin can do this  */

    // localhost:3000/api/products?req=addProduct
    const item = req.body;
    // add new item
    let qry = `INSERT INTO products (id, name, price, item_group, color) VALUES 
    (NULL, '${item.name}', '${item.price}', '${item.item_group}', '${item.color}')`;

    try {
      (async () => {
        let result = await handler(mysql, qry);
        console.log(result);
        res.status(200).json({
          ans: `item added`,
        });
      })();
    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  } else if (
    //edit item  ONLY ADMIN CAN
    req.method === "PUT" &&
    req.query.req == "updatingProduct" &&
    (req.headers.cookie.split(";").indexOf(`adminRequest=true`) >= 0 ||
      req.headers.cookie.split(";").indexOf(` adminRequest=true`) >= 0)
  ) {
    /* only admin can do this  */

    // localhost:3000/api/products?req=updatingProduct

    const itemId = req.body.id;
    const updatedItem = req.body;

    //updata item
    let qry = `UPDATE products SET 
    name = '${updatedItem.name}',
     price = '${updatedItem.price}',
     item_group = '${updatedItem.item_group || ""}',
     color = '${updatedItem.color}'
     WHERE products.id = ${itemId};`;
    (async () => {
      try {
        const result = await handler(mysql, qry);
        console.log(result);
        await res.status(201).json({
          and: "item updated",
        });
      } catch (err) {
        res.status(400).json({
          error: err,
        });
      }
    })();
  } else {
    res.status(400).json({
      error: "doesnt match any api req in porducts ",
    });
  }
}

// made that the for loop wil itarat the order and make one big qry ,
// need to loop trow the orderList and conjoin the objects that are the
// same and just to incrise the qry number
