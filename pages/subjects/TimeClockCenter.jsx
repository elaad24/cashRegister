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
        <h2 className={styles.title}>{"users center"}</h2>

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
                  <td>{data.start}</td>
                  <td>{data.finish}</td>
                  <td>{(data.completed = 1 ? "true" : "false")}</td>
                  <td>{data.duration.slice(0, 8)}</td>
                  <td className="d-flex justify-content-center gap-4"></td>
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

  console.log(results);
  return {
    props: {
      allData: results.map((data) => ({
        id: data.id,
        user_id: data.user_id,
        start: data.start,
        finish: data.finish,
        completed: data.completed,
        duration: data.duration,
      })),
    },
  };
}
