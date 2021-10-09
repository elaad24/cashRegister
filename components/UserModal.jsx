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

  async function handleSubmit(e) {
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
            </Form.Label>
            <Form.Control
              className="placeholder-danger"
              type="text"
              defaultValue={
                NameRef.current?.value == ""
                  ? NameRef.current?.value
                  : NameRef.current
              }
              ref={NameRef}
              minLength="2"
              placeholder={nameError}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              {"Last name"}
              <span>
                <small className="text-danger">* require</small>
              </span>
            </Form.Label>
            <Form.Control
              className="placeholder-danger"
              type="text"
              defaultValue={
                lastNameRef.current?.value == ""
                  ? lastNameRef.current?.value
                  : lastNameRef.current
              }
              ref={lastNameRef}
              minLength="2"
              placeholder={lastNameError}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              {"User pin"}

              <span>
                <small className="text-danger">* require</small>
              </span>
            </Form.Label>
            <Form.Control
              className="placeholder-danger"
              type="number"
              defaultValue={
                user_pinRef.current?.value == ""
                  ? user_pinRef.current?.value
                  : user_pinRef.current
              }
              ref={user_pinRef}
              min="0.01"
              placeholder={user_pinError}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              {"with permisson"}
              <span>
                <small className="text-danger">* require</small>
              </span>
            </Form.Label>
            <Form.Control
              className="placeholder-danger"
              type="text"
              defaultValue={
                with_permissionRef.current?.value == ""
                  ? with_permissionRef.current?.value
                  : with_permissionRef.current == 1
                  ? true
                  : false
              }
              ref={with_permissionRef}
              placeholder={with_permissionError}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              {"Telephone number"}
              <span>
                <small className="text-danger">* require</small>
              </span>
            </Form.Label>
            <Form.Control
              type="number"
              defaultValue={
                telephone_numberRef.current?.value == ""
                  ? telephone_numberRef.current?.value
                  : telephone_numberRef.current
              }
              ref={telephone_numberRef}
              placeholder={telephone_numberError}
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
