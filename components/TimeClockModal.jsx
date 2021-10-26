import React, { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { startShift, endShift } from "../pages/service/timeClockService";

// check why the req to server are bad

const UserPinModal = ({ callback, modalState, setModalState }) => {
  const pinNumberRef = useRef();

  const [action, setAction] = useState("");

  const [actionError, setActionError] = useState("");
  let [pinError, setPinError] = useState("");

  const actionType = (e) => {
    setAction(e.target.id);
  };

  const validinput = () => {
    console.log("validation start");
    if (action == "") {
      setActionError("must choose if you are start or end the shift");
      return false;
    } else {
      setActionError("");
    }

    if (pinNumberRef.current.value.length < 1) {
      setPinError("pin number must beat least one character");
      console.log(pinError);
      return false;
    } else {
      setPinError("");
    }

    return true;
  };

  const startShiftFunction = async () => {
    console.log(pinNumberRef.current.value);
    const { data } = await startShift(pinNumberRef.current.value);
    console.log(data);
    alert(data);
  };

  const endShiftFunction = async () => {
    const { data } = await endShift(pinNumberRef.current.value);
    console.log(data);
    alert(data);
  };

  async function handleSubmit() {
    if (validinput()) {
      // function that send data to database
      try {
        if (action == "start") {
          await startShiftFunction();
        } else if (action == "end") {
          await endShiftFunction();
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
          <h2>Time Clock</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>
              {actionError ? (
                <>
                  <br /> <small className="text-danger">{actionError}</small>
                </>
              ) : (
                ""
              )}
            </Form.Label>
            <div className="d-flex justify-content-around">
              <input
                type="radio"
                class="btn-check"
                name="option"
                id="start"
                autocomplete="off"
                onClick={(e) => actionType(e)}
              />
              <label className="btn btn-outline-secondary" for="start">
                Start shift
              </label>

              <input
                type="radio"
                class="btn-check"
                name="option"
                id="end"
                autocomplete="off"
                onClick={(e) => actionType(e)}
              />
              <label class="btn btn-outline-secondary" for="end">
                End shift
              </label>
            </div>
          </Form.Group>

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
