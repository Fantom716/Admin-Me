import React from "react";
import "../../../styles/cardManager.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  addProductFailure,
  addProductRequest,
  addProductSuccess,
} from '../../redux/manager/products/actions';
import { addNotify, addNotifyFailure, deleteNotify, deleteNotifyFailure, editNotify, editNotifyFailure } from "../../redux/notifications/actions";
import { actions, idUser } from "../consts";
const host = process.env.REACT_APP_HOST;

function ProductCard(props) {

  const [data, setData] = useState([]);
  const [addElement, setAddElement] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [partners, setPartners] = useState([]);
  const [originalProduct, setOriginalProduct] = useState({});
  const [responceAddProduct, setResponceAddProduct] = useState([]);
  const [addProduct, setAddProduct] = useState({
    nameProduct: "",
    categoryProduct: "",
    count: "",
    countSell: "",
    dateOfSell: "",
    descriptionProduct: "",
    developer: "",
    priceProduct: "",
    error: "",
  })

  useEffect(() => {
    axios.get(`http://${host}:5011/products`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setData(error);
      })
    axios.get(`http://${host}:5003/partners`)
      .then((response) => {
        setPartners(response.data);
      })
      .catch((error) => {
        setPartners(error);
      })
  }, []);

  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const store = useSelector((state) => state)
  const error = store.products.error
  const topic = "Продукты"
  const uniqueCategories = [...new Set(data.map((product) => product.categoryProduct))];

  const handleInputChange = (e) => {
    e.preventDefault();
    setAddProduct({
      ...addProduct,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEdit = (index) => {
    if (index === editIndex) {
      setEditIndex(-1);
    } else {
      setEditIndex(index);
    }
  };


  const addingProduct = (e) => {
    e.preventDefault();
    if (!addProduct.nameProduct || !addProduct.categoryProduct || !addProduct.count || !addProduct.countSell || !addProduct.dateOfSell || !addProduct.descriptionProduct || !addProduct.developer || !addProduct.priceProduct) {
      const error = "Заполнены не все поля"
      dispatch(addNotifyFailure(topic, actions.failure.add, selector, idUser, error));
      console.log(addProduct)
      return;
    }

    axios.post(`http://${host}:5011/products/add`, addProduct)
      .then((response) => {
        console.log("ok")
        dispatch(addNotify(addProduct.developer, topic, actions.success.add, selector, idUser))
        setResponceAddProduct(response.data);
        setAddProduct({
          nameProduct: "",
          categoryProduct: "",
          count: "",
          countSell: "",
          dateOfSell: "",
          descriptionProduct: "",
          developer: "",
          priceProduct: "",
        })
      })
      .catch((error) => {
        dispatch(addNotifyFailure(topic, actions.failure.add, selector, idUser, error.message))
      })
  };

  const handleCancel = (e) => {
    setEditIndex(-1);
    setAddProduct(data.map((product, index) => index === editIndex ?
      originalProduct : product));
  }

  const handleChange = (event, index, field) => {
    const newData = [...data];
    newData[index][field] = event.target.value;
    setData(newData);
  };

  const addNewElement = (event) => {
    event.preventDefault()
    setAddElement(!addElement);
  }

  const handleSave = (index) => {
    const updatedProduct = data[index];
    axios.post(`http://${host}:5011/products/update`, updatedProduct)
      .then((response) => {
        dispatch(editNotify(updatedProduct.nameProduct, topic, actions.success.edit, selector, idUser))
        setResponceAddProduct(response.data);
      })
      .catch((error) => {
        dispatch(editNotifyFailure(updatedProduct.nameProduct, topic, actions.success.edit, selector, idUser, error.message))
      })
  }

  const handleDelete = (index) => {
    const deletedProduct = data[index];
    axios.post(`http://${host}:5011/products/delete`, deletedProduct)
      .then((response) => {
        dispatch(deleteNotify(deletedProduct.nameProduct, topic, actions.success.delete, selector, idUser))
        console.log("ol")
      }).catch((error) => {
        dispatch(deleteNotifyFailure(deletedProduct.nameProduct, topic, actions.failure.delete, selector, idUser, error.message))
        console.log("ok")
      })
  }

  return (
    <div className="wrapperCards">

      {addElement ? (
        <button onClick={addNewElement} className="mainButtonAddDel buttonAdd"></button>
      ) : (
        <>
          <button onClick={addNewElement} className="mainButtonAddDel buttonDel"></button>
          <div className="addingAboutCard aboutCard">
            <div className="inputValuesCard valuesCard">
              <p className="valueCard">Заполните следующие данные:</p>
              <input type="text" required placeholder="Название продукта" className="inputValueCard" name="nameProduct" onChange={handleInputChange} />
              <input type="number" required placeholder="Количество" className="inputValueCard" name="count" onChange={handleInputChange} />
              <input type="number" required placeholder="Количество проданных копий" className="inputValueCard" name="countSell" onChange={handleInputChange} />
              <input type="datetime-local" required placeholder="Дата последней продажи" className="inputValueCard" name="dateOfSell" onChange={handleInputChange} />
              <input type="text" required placeholder="Краткое описание" className="inputValueCard" name="descriptionProduct" onChange={handleInputChange} />
              <select className="inputValueCard selectInput" required name="developer" id="" onChange={handleInputChange}>
                <option value="selectDisabled" selected>Выберите разработчика</option>
                {partners.map((partner, index) => {
                  return (
                    <option onChange={handleInputChange} key={index} value={partner.idPartner}>{partner.nameCompany}</option>
                  )
                })}
              </select>
              <select className="inputValueCard selectInput" required name="categoryProduct" onChange={handleInputChange}>
                <option selected disabled value="">Выберите категорию</option>
                {uniqueCategories.map((categoryProduct, index) => {
                  return (
                    <option key={index} value={categoryProduct}>{categoryProduct}</option>
                  )
                })}
              </select>
              <input type="number" required placeholder="Цена" className="inputValueCard" name="priceProduct" onChange={handleInputChange} />
              <p className="error">{error}</p>
              <p>Все поля являются обязательными</p>
            </div>
            <div className="wrapperButtons" style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <button onClick={addingProduct} className="addButton headerButtonMain"></button>
            </div>
          </div>
        </>
      )}

      {data.map((product, index) => {
        return (
          <div key={index} className="aboutCard">
            <div className="valuesCard">
              {editIndex === index ? (
                <>
                  <input type="text" className="inputValueCard" value={product.nameProduct} onChange={(event) => handleChange(event, index, "nameProduct")}></input>
                  <input type="text" className="inputValueCard" value={product.categoryProduct} onChange={(event) => handleChange(event, index, "categoryProduct")}></input>
                  <input type="number" className="inputValueCard" value={product.count} onChange={(event) => handleChange(event, index, "count")}></input>
                  <input type="number" className="inputValueCard" value={product.countSell} onChange={(event) => handleChange(event, index, "countSell")}></input>
                  <input type="datetime-local" className="inputValueCard" value={product.dateOfSell} onChange={(event) => handleChange(event, index, "dateOfSell")}></input>
                  <input type="text" className="inputValueCard" value={product.descriptionProduct} onChange={(event) => handleChange(event, index, "descriptionProduct")}></input>
                  <input type="text" className="inputValueCard" value={product.developer} onChange={(event) => handleChange(event, index, "developer")}></input>
                  <input type="text" className="inputValueCard" value={product.priceProduct} onChange={(event) => handleChange(event, index, "priceProduct")}></input>
                </>
              ) : (
                <>
                  <p className="valueCard">{product.nameProduct}</p>
                  <p className="valueCard">Категория продукта: {product.categoryProduct}</p>
                  <p className="valueCard">Количество: {product.count}</p>
                  <p className="valueCard">Количество проданных копий: {product.countSell}</p>
                  <p className="valueCard">Дата последней продажи: {product.dateOfSell}</p>
                  <p className="valueCard">Краткое описание {product.descriptionProduct}</p>
                  <p className="valueCard">Разработчик: {product.developer}</p>
                  <p className="valueCard">Цена: {product.priceProduct}</p>
                </>
              )}
            </div>
            <div className="wrapperButtons">
              <div className="headerButtons">
                {editIndex === index ? (
                  <>
                    <button onClick={() => handleSave(index)} className="addButton headerButtonMain acceptButton"></button>
                    <button onClick={() => handleCancel(index)} className="contactButton headerButtonMain cancelButton"></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => toggleEdit(index)} className="contactButton headerButtonMain editButton"></button>
                    <button onClick={() => handleDelete(index)} className="contactButton headerButtonMain deleteButton"></button>
                  </>
                )}
              </div>
              <button className="contactButton" style={{ padding: "10px" }}>Подробнее</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ProductCard;