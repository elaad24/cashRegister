import React, { useState } from "react";
import handler, { mysql } from "../api/endpoint";
import "bootstrap/dist/css/bootstrap.min.css";
import UserModal from "../../components/UserModal";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { deleteUser } from "../service/usersService";

const UserCenter = (props) => {
  let headersTitles = Object.keys(props.users[0]);

  const [modalOpen, setModalOpen] = useState(false);
  const [tempUser, setTempUser] = useState({});
  const [actionType, setActionType] = useState("");

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = (user, actionType) => {
    setTempUser(user);
    setActionType(actionType);
    setModalOpen(true);
  };

  const removeUser = async (userID) => {
    await deleteUser(userID);
    window.location.reload();
  };

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
            onClick={() => openModal({}, "add")}
          >
            {"add new user"}
          </button>
        </div>
      </div>
      {tempUser !== {} && modalOpen === true ? (
        <UserModal
          id={tempUser?.id}
          name={tempUser?.name}
          lastName={tempUser?.lastName}
          user_pin={tempUser?.user_pin}
          with_permission={tempUser?.with_permission}
          telephone_number={tempUser?.telephone_number}
          modalState={modalOpen}
          setModalState={setModalOpen}
          submitAction={actionType}
        />
      ) : (
        ""
      )}
      <div className="container  d-flex justify-content-center text-center">
        <table class="table table-striped">
          <thead>
            <tr>
              {headersTitles.map((title) => {
                return <th scope="col">{title}</th>;
              })}
              <th scope="col">Function</th>
            </tr>
          </thead>

          <tbody>
            {props.users.map((user) => {
              return (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.user_pin}</td>
                  <td>{user.with_permission}</td>
                  <td>{user.telephone_number}</td>
                  <td className="d-flex justify-content-center gap-4">
                    <button
                      className="btn btn-warning"
                      onClick={() => openModal(user, "update")}
                    >
                      {"Edit"}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeUser(user.id)}
                    >
                      {"Delete"}
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

export default UserCenter;

export async function getStaticProps(context) {
  const qry = `SELECT * FROM employees`;

  const results = await handler(mysql, qry);

  return {
    props: {
      users: results.map((user) => ({
        id: user.id,
        name: user.name,
        lastName: user.last_name,
        user_pin: user.user_pin,
        with_permission: user.with_permission,
        telephone_number: user.telephone_number,
      })),
    },
  };
}
