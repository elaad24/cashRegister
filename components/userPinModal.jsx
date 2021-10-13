import React, { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { checkIfAdmin } from "../pages/service/usersService";

// check why the req to server are bad

const UserPinModal = ({ callback, modalState, setModalState }) => {
  const pinNumberRef = useRef();

  let [pinError, setPinError] = useState("");

  const validinput = () => {
    console.log("validation start");
    if (pinNumberRef.current.value.length < 1) {
      setPinError("pin number must beat least one character");
      console.log(pinError);
      return false;
    }

    return true;
  };

  async function handleSubmit(e) {
    if (validinput()) {
      // function that send data to database
      setPinError("");
      try {
        const { data } = await checkIfAdmin(pinNumberRef.current.value);
        if (data == 1) {
          await callback(pinNumberRef.current.value);
        }
        await closeModal();
      } catch (err) {
        if (err?.response?.data?.error?.pinNumber) {
          setPinError(err.response.data.error.pinNumber);
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
        <Modal.Title id="contained-modal-title-vcenter">
          Enter Pin number
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>
              {"Pin number"}
              {pinError ? (
                <>
                  <br /> <small className="text-danger">{pinError}</small>
                </>
              ) : (
                ""
              )}
            </Form.Label>
            <Form.Control
              className={pinError ? "is-invalid" : ""}
              type="number"
              ref={pinNumberRef}
              minLength="1"
              placeholder={pinError || "user's PIN number "}
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
          Enter PIN
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserPinModal;
