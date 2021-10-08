import React, { useState } from "react";
import handler, { mysql } from "../api/endpoint";
import "bootstrap/dist/css/bootstrap.min.css";
import { deleteItem } from "../service/productsService";
import ItemModal from "../../components/ItemModal";

const productsCenter = (props) => {
  let headersTitles = Object.keys(props.products[0]);

  const [modalOpen, setModalOpen] = useState(false);
  const [tempItem, setTempItem] = useState({});

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = (item) => {
    setTempItem(item);
    setModalOpen(true);
  };

  const removeItem = async (itemId) => {
    await deleteItem(itemId);
    window.location.reload();
  };

  return (
    <div>
      {tempItem !== {} && modalOpen === true ? (
        <ItemModal
          id={tempItem?.id}
          name={tempItem?.name}
          price={tempItem?.price}
          item_group={tempItem?.item_group}
          color={tempItem?.color}
          modalState={modalOpen}
          setModalState={setModalOpen}
          submitAction={"update"}
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
            {props.products.map((item) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.item_group}</td>
                  <td>{item.color}</td>
                  <td className="d-flex justify-content-center gap-4">
                    <button
                      className="btn btn-warning"
                      onClick={() => openModal(item)}
                    >
                      {"Edit"}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeItem(item.id)}
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

export default productsCenter;

export async function getStaticProps(context) {
  const qry = `SELECT * FROM products`;

  const results = await handler(mysql, qry);

  return {
    props: {
      products: results.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        item_group: item.item_group,
        color: item.color,
      })),
    },
  };
}
