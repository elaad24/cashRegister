import React, { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { addProduct, updateProduct } from "../pages/service/productsService";
const ItemModal = ({
  id,
  name,
  price,
  item_group,
  color,
  modalState,
  setModalState,
  submitAction,
}) => {
  const idRef = useRef(id);
  const NameRef = useRef(name);
  const priceRef = useRef(price);
  const item_groupRef = useRef(item_group);
  const colorRef = useRef(color);

  let [nameError, setNameError] = useState("");
  let [priceError, setPriceError] = useState("");
  let [colorError, setColorError] = useState("");

  async function handleSubmit(e) {
    // function that send data to database
    const product = {
      id: idRef?.current,
      name: NameRef.current.value,
      price: priceRef.current.value,
      item_group: item_groupRef.current.value,
      color: colorRef.current.value,
    };
    setNameError("");
    setPriceError("");
    setColorError("");
    e.preventDefault();
    if (submitAction == "add") {
      try {
        await addProduct(product);
        await closeModal();
        await window.location.reload();
      } catch (err) {
        if (err?.response?.data?.error?.name) {
          setNameError(err.response.data.error.name);
        }
        if (err?.response?.data?.error?.price) {
          setPriceError(err.response.data.error.price);
        }
        if (err?.response?.data?.error?.color) {
          setColorError(err.response.data.error.color);
        }
        return err;
      }
    } else if (submitAction == "update") {
      try {
        await updateProduct(product);
        await closeModal();
        await window.location.reload();
      } catch (err) {
        if (err?.response?.data?.error?.name) {
          setNameError(err.response.data.error.name);
        }
        if (err?.response?.data?.error?.price) {
          setPriceError(err.response.data.error.price);
        }
        if (err?.response?.data?.error?.color) {
          setColorError(err.response.data.error.color);
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
        <Modal.Title id="contained-modal-title-vcenter">Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Item Id : {idRef.current || "automatically assigned"}</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>
              {"Title "}
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
              minLength="3"
              placeholder={nameError}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              {"Price "}

              <span>
                <small className="text-danger">* require</small>
              </span>
            </Form.Label>
            <Form.Control
              className="placeholder-danger"
              type="number"
              defaultValue={
                priceRef.current?.value == ""
                  ? priceRef.current?.value
                  : priceRef.current
              }
              ref={priceRef}
              min="0.01"
              placeholder={priceError}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              {"Description "}
              <span>
                <small className="text-danger">* require</small>
              </span>
            </Form.Label>
            <Form.Control
              className="placeholder-danger"
              type="text"
              defaultValue={
                item_groupRef.current?.value == ""
                  ? item_groupRef.current?.value
                  : item_groupRef.current
              }
              ref={item_groupRef}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              {"Category "}
              <span>
                <small className="text-danger">* require</small>
              </span>
            </Form.Label>
            <Form.Control
              className="placeholder-danger"
              type="color"
              defaultValue={
                colorRef.current?.value == ""
                  ? colorRef.current?.value
                  : colorRef.current
              }
              ref={colorRef}
              minLength="3"
              placeholder={colorError}
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
