import React from "react";
import handler, { mysql } from "../api/endpoint";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const TimeClockCenter = (props) => {
  let headersTitles = Object.keys(props.allData[0]);

  return (
    <div>
      <div className="d-flex justify-content-between ">
        <Link href={`/`}>
          <a className="m-4 btn btn-primary">home</a>
        </Link>
        <h2 className={styles.title}>{"time clock center"}</h2>

        <div>
          <button
            className="btn btn-success m-4"
            /* onClick={() => openModal({}, "add")} */
          >
            {"add new shift"}
          </button>
        </div>
      </div>

      <div className="container  d-flex justify-content-center text-center">
        <table className="table table-striped">
          <thead>
            <tr>
              {headersTitles.map((title) => {
                return <th scope="col">{title}</th>;
              })}
              <th scope="col">Function</th>
            </tr>
          </thead>

          <tbody>
            {props.allData.map((data) => {
              return (
                <tr>
                  <td>{data.id}</td>
                  <td>{data.user_id}</td>
                  <td>
                    {new Intl.DateTimeFormat("en-GB", {
                      dateStyle: "short",
                      timeStyle: "medium",
                    }).format(data.start)}
                  </td>
                  <td>
                    {new Intl.DateTimeFormat("en-GB", {
                      dateStyle: "short",
                      timeStyle: "medium",
                    }).format(data.finish)}
                  </td>
                  <td>{data.completed == "1" ? "true" : "false"}</td>
                  <td>{data.duration.slice(0, 8)}</td>
                  <td className="d-flex justify-content-center gap-4">
                    <button
                      className="btn btn-warning "
                      /* onClick={() => openModal({}, "edit")} */
                    >
                      {"edit shift"}
                    </button>
                    <button
                      className="btn btn-danger "
                      /* onClick={() => openModal({}, "delete")} */
                    >
                      {"delete shift"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeClockCenter;

export async function getStaticProps(context) {
  const qry = `SELECT id,user_id,UNIX_TIMESTAMP(start) as start,UNIX_TIMESTAMP(finish) as finish,completed,duration FROM time_clock`;

  const results = await handler(mysql, qry);

  /* multply the start and finish times 1000 so it will be in miliseconds and not seconds  */
  return {
    props: {
      allData: results.map((data) => ({
        id: data.id,
        user_id: data.user_id,
        start: data.start * 1e3,
        finish: data.finish * 1e3,
        completed: data.completed,
        duration: data.duration,
      })),
    },
  };
}
