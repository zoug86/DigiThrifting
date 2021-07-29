import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Row, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

const PlaceOrderScreen = () => {
    const cart = useSelector(state => state.cart)
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    // calculate prices
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10)
    cart.taxPrice = addDecimals(0.15 * cart.itemsPrice)
    cart.totalPrice = addDecimals(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice))

    const placeOrderHandler = () => {

    }
    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p>
                                <strong>To: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> :
                                (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, i) => (
                                            <ListGroupItem key={i}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x ${item.price} = ${item.price * item.qty}
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        ))}

                                    </ListGroup>
                                )}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup>
                            <ListGroupItem>
                                <h2>Order Summary</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button
                                    variant='danger'
                                    type='button'
                                    className='col-12'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </>
    )
}

export default PlaceOrderScreen
