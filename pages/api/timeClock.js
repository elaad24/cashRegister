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
    } else {
      res.status(400).json({
        error: "doesnt match any api req in time clock ",
      });
    }
  } catch (err) {
    console.log(err);
  }
}
