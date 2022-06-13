import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { filterCategory } from '../store/slices/products.slice';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import { addToFavorites } from '../store/slices/favorites.slice';

const ProductsDetail = () => {

    const [products, setProducts] = useState({});
    const [ quantity, setQuantity ] = useState("");

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productsList = useSelector((state) => state.products);

    useEffect(() => {
        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products").then((res) => {
          const productSearched = res.data?.data?.products.find(
            (productItem) => productItem.id === Number(id)
          );
          setProducts(productSearched);
          dispatch(filterCategory(productSearched.category.id));
        });
      }, [dispatch, id]);

    const addFavorite = () => {
        const favorite = {
            id: id,
            quantity: quantity
        }
        dispatch(addToFavorites(favorite));
    }

    return (
        <div>
            <Row>
                <Col>
                <input 
                        type="number" 
                        placeholder='rate' 
                        onChange={e => setQuantity(e.target.value)} 
                        value={quantity} 
                    />
                    <Button onClick={addFavorite}>Add to cart</Button>
                    <h1>{products.title}</h1>

                    
                    

                    <img src={products.productImgs} alt="" className="img-fluid" />
                    {
                        products.description
                     
                    }
                    <h3>${ products.price}</h3>
                </Col>
                <Col lg={3}>
                    <ListGroup variant="flush">
                    {
                        productsList.map(productItem => (
                            <ListGroup.Item key={productItem.id} onClick={() => navigate(`/products/${productItem.id}`)}>
                                {productItem.title}
                            </ListGroup.Item>
                        ))
                    }
                    </ListGroup>
                </Col>
            </Row>

        </div>
    );
};

export default ProductsDetail;