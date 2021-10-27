import handler, { mysql } from "./endpoint";

export default async function timeClock(req, res) {
  try {
    if (
      req.method === "POST" &&
      req.query.req == "startShift" &&
      req.query.userPin != undefined
    ) {
      const userPin = req.query.userPin;
      //http://localhost:3000/api/timeClock?req=startShift&userPin=NUMBER

      const qry1 = `SELECT id,name,last_name from employees WHERE user_pin=${userPin}`;
      const result1 = await handler(mysql, qry1);

      if (result1.length == 0) {
        res.status(400).json("error - wrong pin number ");
      }
      const user_name = result1[0].name;
      const user_last_name = result1[0].last_name;
      const userID = result1[0].id;

      const qry2 = `INSERT INTO time_clock (id,user_id,start,finish,completed,duration) VALUES (null,${userID},null,null,0,0)`;

      const result2 = await handler(mysql, qry2);
      console.log(result2);
      if (result2.affectedRows == 1) {
        res.status(201).json(`welcome ${user_name} ${user_last_name} `);
      }
    } else if (
      req.method === "POST" &&
      req.query.req == "endShift" &&
      req.query.userPin != undefined
    ) {
      const userPin = req.query.userPin;
      //http://localhost:3000/api/timeClock?req=endShift&userPin=NUMBER

      const qry1 = `SELECT id,name,last_name from employees WHERE user_pin=${userPin}`;
      const result1 = await handler(mysql, qry1);
      console.log(result1);
      if (result1.length == 0) {
        res.status(400).json("error - wrong pin number ");
      }
      const user_name = result1[0].name;
      const user_last_name = result1[0].last_name;
      const userID = result1[0].id;

      const qry2 = `SELECT UNIX_TIMESTAMP(start) as start  from time_clock where user_id=${userID} and completed=0 `;
      const result2 = await handler(mysql, qry2);

      if (result2[0] == undefined) {
        res
          .status(400)
          .json("error - wrong user or user does not start shift ");
      }
      const start = result2[0].start;

      const timeStamp = Math.floor(Date.now() / 1000);
      const durationInUnix = timeStamp - start;

      const format_time = (uinx) => {
        const dtFormat = new Intl.DateTimeFormat("en-GB", {
          timeStyle: "medium",
          timeZone: "UTC",
        });

        return dtFormat.format(new Date(uinx * 1e3));
      };

      const duration = format_time(durationInUnix);

      const qry3 = `UPDATE time_clock SET  finish = FROM_UNIXTIME(${timeStamp}) ,completed = 1 ,duration= '${duration}' where user_id=${userID} and completed=0`;

      const result3 = await handler(mysql, qry3);
      if (result3.affectedRows == 1) {
        res
          .status(201)
          .json(
            `goodbay ${user_name} ${user_last_name}  you worked ${duration} `
          );
      }
    } else if (
      req.method === "DELETE" &&
      req.query.req == "deleteShift" &&
      req.query.shiftID != undefined &&
      (req.headers.cookie.split(";").indexOf(`adminRequest=true`) >= 0 ||
        req.headers.cookie.split(";").indexOf(` adminRequest=true`) >= 0)
    ) {
      /* need to test it !!!!!! */

      /* only admin can do this  */
      //http://localhost:3000/api/timeClock?req=deleteShift&shiftID=NUMBER
      const qry = `DELETE FROM time_clock WHERE id = ${req.query.shiftID}`;
      const result = await handler(mysql, qry);
      console.log(result);
      res.status(200).json({
        ans: "shift deleted",
      });
    } else if (
      req.method === "POST" &&
      req.query.req == "addShift" &&
      req.body.userPinNumber != undefined &&
      req.body.startTimeUnix != undefined &&
      req.body.endTimeUnix != undefined &&
      (req.headers.cookie.split(";").indexOf(`adminRequest=true`) >= 0 ||
        req.headers.cookie.split(";").indexOf(` adminRequest=true`) >= 0)
    ) {
      /* need to test it !!!! */
      /* only admin can do this  */
      //http://localhost:3000/api/timeClock?req=addShift
      const userPin = req.query.userPinNumber;

      const qry1 = `SELECT id,name,last_name from employees WHERE user_pin=${userPin}`;
      const result1 = await handler(mysql, qry1);

      if (result1.length == 0) {
        res.status(400).json("error - wrong pin number ");
      }
      const user_name = result1[0].name;
      const user_last_name = result1[0].last_name;
      const userID = result1[0].id;
      const startShift = req.body.startTimeUnix;
      const endShift = req.body.endTimeUnix;

      const durationInUnix = endShift - startShift;

      const format_time = (uinx) => {
        const dtFormat = new Intl.DateTimeFormat("en-GB", {
          timeStyle: "medium",
          timeZone: "UTC",
        });

        return dtFormat.format(new Date(uinx * 1e3));
      };

      const duration = format_time(durationInUnix);

      const qry2 = `INSERT INTO time_clock (id,user_id,start,finish,completed,duration) VALUES (null,${userID},FROM_UNIXTIME(${startShift}),FROM_UNIXTIME(${endShift}),1,${duration})`;

      const result2 = await handler(mysql, qry2);
      console.log(result2);
      if (result2.affectedRows == 1) {
        res
          .status(201)
          .json(
            `shift inserted as  ${user_name} ${user_last_name} </br> durtion ${duration} `
          );
      }
    } else if (
      req.method === "PUT" &&
      req.query.req == "updateShift" &&
      req.body.shiftID != undefined &&
      req.body.startTimeUnix != undefined &&
      req.body.endTimeUnix != undefined &&
      req.body.completed != undefined &&
      (req.headers.cookie.split(";").indexOf(`adminRequest=true`) >= 0 ||
        req.headers.cookie.split(";").indexOf(` adminRequest=true`) >= 0)
    ) {
      /* need to test it !!!! */
      /* only admin can do this  */
      //http://localhost:3000/api/timeClock?req=updateShift

      const shiftID = req.body.shiftID;
      const startShift = req.body.startTimeUnix;
      const endShift = req.body.endTimeUnix;
      const shiftCompleted = req.body.completed;

      let durationInUnix = 0;

      if (shiftCompleted == "true") {
        shiftCompleted = 1;
        durationInUnix = endShift - startShift;
      } else if (shiftCompleted == "false") {
        shiftCompleted = 0;
      }

      const format_time = (uinx) => {
        const dtFormat = new Intl.DateTimeFormat("en-GB", {
          timeStyle: "medium",
          timeZone: "UTC",
        });
        return dtFormat.format(new Date(uinx * 1e3));
      };

      const duration = format_time(durationInUnix);

      const qry = `UPDATE time_clock set
       start=${startShift} ,
       finish=${endShift},
       completed=${shiftCompleted},
       duration=${duration}
       where time_clock.id=${shiftID}`;

      const result = await handler(mysql, qry);

      if (result.affectedRows == 1) {
        res
          .status(201)
          .json(
            `shift updated as  ${user_name} ${user_last_name} </br> durtion ${duration} `
          );
      }
    } else {
      res.status(400).json({
        error: "doesnt match any api req in time clock ",
      });
    }
  } catch (err) {
    console.log(err);
  }
}