import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { filterCategory, filterHeadline, getProducts } from '../store/slices/products.slice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, FormControl, InputGroup, ListGroup, Row } from 'react-bootstrap';
import axios from 'axios';

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ search, setSearch ] = useState("");
    const [ categories, setCategories ] = useState([]);

    const products = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProducts());

        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
            .then(res => setCategories(res.data?.data.categories))
    }, [ dispatch ]);

    const filterProducts = () => {
        dispatch(filterHeadline(search));
    }

    const selectCategory = (id) => {
        dispatch(filterCategory(id))
    }

    

    return (
        <div>
            <h1>Home</h1>

            <Row className="g-4">
                <Col lg={3} className="mb-4">
                    <h4>Categories</h4>
                    <ListGroup>
                        {
                            categories.map(category => (
                                <ListGroup.Item key={category.id} onClick={() => selectCategory(category.id)}>
                                    {category.name}
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Col>


                <Col>
                
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search"
                            onChange={e => setSearch(e.target.value)}
                            value={search}
                        />
                        <Button variant="outline-secondary" id="button-addon2" onClick={filterProducts}>
                            Button
                        </Button>
                    </InputGroup>

                    <Row xs={1} md={2} lg={3} className="g-2">
                        {
                            products.map(product => (
                                <Col key={product.id}>
                                    <Card style={{ cursor: "pointer" }} onClick={() => navigate(`/products/${product.id}`)}>
                                        <Card.Img variant="top" src={product.productImgs} />
                                        <Card.Body>
                                            <Card.Title>{product.category.name}</Card.Title>
                                            <Card.Text>
                                                {product.price}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer className="text-muted">{product.status}</Card.Footer>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </Col>
            </Row>



        </div>
    );
};

export default Home;