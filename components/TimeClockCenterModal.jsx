import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { addShift, updateShift } from "../pages/service/timeClockService";

/* to set that yoi cant end shift before the time you started  */

const TimeClockCenterModal = ({
  actionType,
  item,
  modalState,
  setModalState,
}) => {
  const pinNumberRef = useRef();
  const startShiftRef = useRef(item?.start);
  const endShiftRef = useRef(item?.finish);
  console.log("start shiftref:", endShiftRef);
  console.log("end shiftref:", endShiftRef);

  let [pinError, setPinError] = useState("");
  let [startShiftError, setstartShiftError] = useState("");
  let [endShiftError, setEndShiftError] = useState("");
  let [tempItem, setTempItem] = useState(undefined);

  console.log("from modal", item);

  console.log(startShiftRef);
  console.log(endShiftRef);

  useEffect(() => {
    if (item != undefined) {
      setTempItem(item);
      console.log("set temp item as : ", tempItem);
    }
  }, [item]);

  const validinput = () => {
    console.log("validation start");

    if (pinNumberRef.current.value.length < 1) {
      setPinError("pin number must beat least one character");
      console.log(pinError);
      return false;
    } else {
      setPinError("");
    }
    if (startShiftRef.current.value == "") {
      setstartShiftError("start shift must have date and time ");
      return false;
    } else {
      setstartShiftError("");
    }
    if (endShiftRef.current.value == "") {
      setEndShiftError("end shift must have date and time ");
      return false;
    } else {
      setEndShiftError("");
    }

    return true;
  };

  const dateTimeStringToUnix = (string) => {
    return Math.round(new Date(string).getTime() / 1000);
  };

  const addShiftFunction = async () => {
    console.log(pinNumberRef.current.value);
    console.log(startShiftRef.current.value);
    console.log(endShiftRef.current.value);
    console.log(
      "duration",
      dateTimeStringToUnix(endShiftRef.current.value) -
        dateTimeStringToUnix(startShiftRef.current.value)
    );
    const { data } = await addShift(
      pinNumberRef.current.value,
      dateTimeStringToUnix(startShiftRef.current.value),
      dateTimeStringToUnix(endShiftRef.current.value)
    );
    console.log(data);
    alert(data);
    window.location.reload();
  };

  const updateShiftFunction = async () => {
    console.log(pinNumberRef.current.value);
    console.log(startShiftRef.current.value);
    console.log(endShiftRef.current.value);
    console.log(
      "duration",
      dateTimeStringToUnix(endShiftRef.current.value) -
        dateTimeStringToUnix(startShiftRef.current.value)
    );
    let completedValue = 0;
    if (endShiftRef.current.value != "") {
      completedValue = 1;
    }
    const { data } = await updateShift(
      item.id,
      dateTimeStringToUnix(startShiftRef.current.value),
      dateTimeStringToUnix(endShiftRef.current.value),
      completedValue
    );
    console.log(data);
    alert(data);
    window.location.reload();
  };

  async function handleSubmit() {
    if (validinput()) {
      // function that send data to database
      try {
        if (actionType == "add") {
          await addShiftFunction();
        } else if (action == "update") {
          await updateShiftFunction();
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
          <h3>{actionType} shift</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {item?.id ? <div> shift number : {item.id} </div> : ""}

          {item?.user_id ? (
            <div>user number : {item.user_id} </div>
          ) : (
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
                defaultValue={tempItem?.user_id ? tempItem.user_id : ""}
                placeholder={pinError || "user's PIN number "}
                required
              />
            </Form.Group>
          )}
          <Form.Group>
            <Form.Label>
              {"start of the shift"}
              {/*  {startShiftError ? (
                <>
                  <br /> <small className="text-danger">{startShiftError}</small>
                </>
              ) : (
                ""
              )} */}
            </Form.Label>
            <Form.Control
              /*               className={startShiftError ? "is-invalid" : ""}
               */
              type="datetime-local"
              min="2021-10-01T00:00"
              max="2022-12-31T00:00"
              placeholder={startShiftError || "start shift date and time "}
              defaultValue={
                tempItem?.start
                  ? new Date(tempItem.start).toISOString().slice(0, 19)
                  : ""
              }
              ref={startShiftRef}
              required
              onClick={(e) => console.log(e.target.value, startShiftRef)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              {"end of the shift"}
              {/*  {endShiftError ? (
                <>
                  <br /> <small className="text-danger">{endShiftError}</small>
                </>
              ) : (
                ""
              )} */}
            </Form.Label>
            <Form.Control
              /*               className={endShiftError ? "is-invalid" : ""}
               */
              type="datetime-local"
              min="2021-10-01T00:00"
              max="2022-12-31T00:00"
              defaultValue={
                tempItem?.finish
                  ? new Date(tempItem.finish).toISOString().slice(0, 19)
                  : ""
              }
              ref={endShiftRef}
              placeholder={endShiftError || "end shift date and time "}
              required
              onClick={(e) => console.log(e)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => closeModal()}>
          Discard changes
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Save shift
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TimeClockCenterModal;
