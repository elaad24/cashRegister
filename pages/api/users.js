import handler, { mysql } from "./endpoint";

export default async function users(req, res) {
  try {
    if (
      // get all users
      req.method === "GET" &&
      req.query.req == "getUsers"
    ) {
      //http://localhost:3000/api/users?req=getUsers
      const qry = `SELECT * FROM employees`;
      const result = await handler(mysql, qry);
      res.status(200).json(result);
    } else if (
      // delete user ONLY ADMIN CAN
      req.method === "DELETE" &&
      req.query.req == "removeUser" &&
      req.query.userID != undefined &&
      (req.headers.cookie.split(";").indexOf(`adminRequest=true`) >= 0 ||
        req.headers.cookie.split(";").indexOf(` adminRequest=true`) >= 0)
    ) {
      /* only admin can do this  */

      //http://localhost:3000/api/users?req=removeUser&userID=NUMBER

      // delete user with it's employee id
      const qry = `DELETE FROM employees WHERE employees.id = ${req.query.userID}`;
      const result = await handler(mysql, qry);
      console.log(result);
      res.status(200).json({
        ans: "user deleted",
      });
    } else if (
      // add new use ONLY ADMIN CAN
      req.method === "POST" &&
      req.query.req == "addUser" &&
      (req.headers.cookie.split(";").indexOf(`adminRequest=true`) >= 0 ||
        req.headers.cookie.split(";").indexOf(` adminRequest=true`) >= 0)
    ) {
      /* only admin can do this  */

      // localhost:3000/api/users?req=addUser

      // add new user
      let qry = `INSERT INTO employees (id, name,last_name,user_pin,with_permission,telephone_number) VALUES 
    (NULL, '${user.name}', '${user.last_name}','${user.user_pin}','${
        user.with_permission == true ? 1 : 0
      }','${user.telephone_number}')`;

      try {
        (async () => {
          let result = await handler(mysql, qry);
          console.log(result);
          res.status(200).json({
            ans: `user added`,
          });
        })();
      } catch (err) {
        res.status(400).json({
          error: err,
        });
      }
    } else if (
      // edit user info ONLY ADMIN CAN
      req.method === "PUT" &&
      req.query.req == "updatingUser" &&
      (req.headers.cookie.split(";").indexOf(`adminRequest=true`) >= 0 ||
        req.headers.cookie.split(";").indexOf(` adminRequest=true`) >= 0)
    ) {
      /* only admin can do this  */

      // localhost:3000/api/users?req=updatingUser

      const userId = req.body.id;
      const updatedUser = req.body;

      // update the info
      let qry = `UPDATE employees SET 
    name = '${updatedUser.name}',
     last_name = '${updatedUser.last_name}',
     user_pin  = '${updatedUser.user_pin}',
     with_permission  = '${updatedUser.with_permission == true ? 1 : 0}'
     telephone_number = '${updatedUser.color}'
     WHERE employees.id = ${userId};`;
      (async () => {
        try {
          const result = await handler(mysql, qry);
          console.log(result);
          await res.status(201).json({
            and: "user updated",
          });
        } catch (err) {
          res.status(400).json({
            error: err,
          });
        }
      })();
    } else if (
      // to check if user have admin privileges
      req.method === "GET" &&
      req.query.req == "checkIfAdmin" &&
      req.query.userPin != undefined
    ) {
      //http://localhost:3000/api/users?req=checkIfAdmin&userPin=NUMBER

      // check the user
      const qry = `SELECT with_permission FROM employees WHERE employees.user_pin= ${req.query.userPin}`;
      const result = await handler(mysql, qry);
      console.log(result);
      res.status(200).json(result[0]?.with_permission);
    } else {
      res.status(400).json({
        error: "doesnt match any api req in users ",
      });
    }
  } catch (err) {
    console.log(err);
  }
}
