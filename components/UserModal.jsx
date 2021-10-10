import React, { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { addUser, updateUser } from "../pages/service/usersService";

// check why the req to server are bad

const ItemModal = ({
  id,
  name,
  lastName,
  user_pin,
  with_permission,
  telephone_number,
  modalState,
  setModalState,
  submitAction,
}) => {
  const idRef = useRef(id);
  const NameRef = useRef(name);
  const lastNameRef = useRef(lastName);
  const user_pinRef = useRef(user_pin);
  const with_permissionRef = useRef(with_permission);
  const telephone_numberRef = useRef(telephone_number);

  let [nameError, setNameError] = useState("");
  let [lastNameError, setLastNameError] = useState("");
  let [user_pinError, setUser_pinError] = useState("");
  let [with_permissionError, setWith_permissionError] = useState("");
  let [telephone_numberError, setTelephone_numberError] = useState("");

  const validinputs = () => {
    console.log("validation start");
    if (
      typeof NameRef.current.value != "string" ||
      NameRef.current.value.length <= 1
    ) {
      setNameError("name must be string and longer then 2 character ");
      console.log(nameError);
      return false;
    } else {
      setNameError("");
    }
    if (
      typeof lastNameRef.current.value != "string" ||
      lastNameRef.current.value.length <= 1
    ) {
      setLastNameError("last name must be string and longer then 2 character ");
      console.log(lastNameError);
      return false;
    } else {
      setLastNameError("");
    }
    if (user_pinRef.current.value < 0) {
      setUser_pinError("user pin number must be bigger then 0 ");
      console.log(user_pinError);
      return false;
    } else {
      setUser_pinError("");
    }
    if (
      with_permissionRef.current.value != true ||
      with_permissionRef.current.value != false
    ) {
      setWith_permissionError("with permission  must be  true or false  ");
      console.log(telephone_number);
      return false;
    } else {
      setWith_permissionError("");
    }
    if (
      typeof telephone_numberRef.current.value != "number" ||
      telephone_numberRef.current.value.length <= 7
    ) {
      setTelephone_numberError(
        "telephone number must be number and longer then 7 character "
      );
      console.log(telephone_number);
      return false;
    } else {
      setTelephone_numberError("");
    }
    return true;
  };

  async function handleSubmit(e) {
    if (validinputs()) {
      // function that send data to database
      const user = {
        id: idRef?.current,
        name: NameRef.current.value,
        last_name: lastNameRef.current.value,
        user_pin: user_pinRef.current.value,
        with_permission: with_permissionRef.current.value,
        telephone_number: telephone_numberRef.current.value,
      };
      setNameError("");
      setLastNameError("");
      setUser_pinError("");
      setWith_permissionError("");
      setTelephone_numberError("");
      e.preventDefault();
      if (submitAction == "add") {
        try {
          await addUser(user);
          await closeModal();
          await window.location.reload();
        } catch (err) {
          if (err?.response?.data?.error?.name) {
            setNameError(err.response.data.error.name);
          }
          if (err?.response?.data?.error?.lastName) {
            setLastNameError(err.response.data.error.lastName);
          }
          if (err?.response?.data?.error?.user_pin) {
            setUser_pinError(err.response.data.error.user_pin);
          }
          if (err?.response?.data?.error?.with_permission) {
            setWith_permissionError(err.response.data.error.with_permission);
          }
          if (err?.response?.data?.error?.telephone_number) {
            setTelephone_numberError(err.response.data.error.telephone_number);
          }

          return err;
        }
      } else if (submitAction == "update") {
        try {
          await updateUser(user);
          await closeModal();
          await window.location.reload();
        } catch (err) {
          if (err?.response?.data?.error?.name) {
            setNameError(err.response.data.error.name);
          }
          if (err?.response?.data?.error?.lastName) {
            setLastNameError(err.response.data.error.lastName);
          }
          if (err?.response?.data?.error?.user_pin) {
            setUser_pinError(err.response.data.error.user_pin);
          }
          if (err?.response?.data?.error?.with_permission) {
            setWith_permissionError(err.response.data.error.with_permission);
          }
          if (err?.response?.data?.error?.telephone_number) {
            setTelephone_numberError(err.response.data.error.telephone_number);
          }

          return err;
        }
      }
    }
  }

  const closeModal = () => {
    setModalState(false);
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={modalState}
      onHide={() => setModalState(false)}
    >
      <Modal.Header closeButton onHide={() => closeModal()}>
        <Modal.Title id="contained-modal-title-vcenter">Edit user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Item Id : {idRef.current || "automatically assigned"}</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>
              {"Name"}
              <span>
                <small className="text-danger">* require</small>
              </span>
              {nameError ? (
                <>
                  <br /> <small className="text-danger">{nameError}</small>
                </>
              ) : (
                ""
              )}
            </Form.Label>
            <Form.Control
              className={nameError ? "is-invalid" : ""}
              type="text"
              defaultValue={
                NameRef.current?.value == ""
                  ? NameRef.current?.value
                  : NameRef.current
              }
              ref={NameRef}
              minLength="2"
              placeholder={nameError || "user's first name "}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              {"Last name"}
              <span>
                <small className="text-danger">* require</small>
              </span>
              {lastNameError ? (
                <>
                  <br /> <small className="text-danger">{lastNameError}</small>
                </>
              ) : (
                ""
              )}
            </Form.Label>
            <Form.Control
              className={lastNameError ? "is-invalid" : ""}
              type="text"
              defaultValue={
                lastNameRef.current?.value == ""
                  ? lastNameRef.current?.value
                  : lastNameRef.current
              }
              ref={lastNameRef}
              minLength="2"
              placeholder={lastNameError || "user's last name "}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              {"User pin"}
              <span>
                <small className="text-danger">* require</small>
              </span>{" "}
              {user_pinError ? (
                <>
                  <br /> <small className="text-danger">{user_pinError}</small>
                </>
              ) : (
                ""
              )}
            </Form.Label>
            <Form.Control
              className={user_pinError ? "is-invalid" : ""}
              type="number"
              defaultValue={
                user_pinRef.current?.value == ""
                  ? user_pinRef.current?.value
                  : user_pinRef.current
              }
              ref={user_pinRef}
              min="0.01"
              placeholder={"user's pin code "}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              {"with permisson"}
              <span>
                <small className="text-danger">* require</small>
              </span>{" "}
              {with_permissionError ? (
                <>
                  <br />{" "}
                  <small className="text-danger">{with_permissionError}</small>
                </>
              ) : (
                ""
              )}
            </Form.Label>

            <Form.Select ref={with_permissionRef}>
              <option value={false}>False</option>
              <option value={true}>True</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              {"Telephone number"}
              <span>
                <small className="text-danger">* require</small>
              </span>{" "}
              {telephone_numberError ? (
                <>
                  <br />{" "}
                  <small className="text-danger">{telephone_numberError}</small>
                </>
              ) : (
                ""
              )}
            </Form.Label>
            <Form.Control
              className={telephone_numberError ? "is-invalid" : ""}
              type="number"
              defaultValue={
                telephone_numberRef.current?.value == ""
                  ? telephone_numberRef.current?.value
                  : telephone_numberRef.current
              }
              ref={telephone_numberRef}
              placeholder={telephone_numberError || "user's phone number  "}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => closeModal()}>
          discard changes
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ItemModal;
