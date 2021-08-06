import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, ListGroup, Image, Card, ListGroupItem, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { PayPalButton } from "react-paypal-button-v2";
import axios from 'axios'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET, ORDER_DETAILS_RESET } from '../constants/orderConstants'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()
    const { order, loading, error } = useSelector(state => state.orderDetails)
    const { success: successPay, loading: loadingPay } = useSelector(state => state.orderPay)
    const { success: successDeliver, loading: loadingDeliver } = useSelector(state => state.orderDeliver)
    const { userInfo } = useSelector(state => state.userLogin)
    // const { cartItems } = useSelector(state => state.cart)

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    useEffect(() => {
        if (!userInfo) {
            history('/login')
        }
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            console.log(clientId)

            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.source = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
            console.log(script)
        }

        if (!order || successPay || successDeliver || order._id !== orderId) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }

    }, [dispatch, order, orderId, successPay, successDeliver])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
        // dispatch({ type: ORDER_DETAILS_RESET })
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return (
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <>
                <h1>Order {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2>Shipping</h2>
                                <p><strong>Name: </strong>{order.user.name}</p>
                                <p><a style={{ textDecoration: 'none' }} href={`mailto:${order.user.email}`}><strong>Email: </strong> {order.user.email}</a></p>
                                <p>
                                    <strong>To: </strong>
                                    {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant='danger'>Not Delivered</Message>}
                            </ListGroupItem>
                            <ListGroupItem>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not Paid</Message>}
                            </ListGroupItem>
                            <ListGroupItem>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 ? <Message>Your order is empty</Message> :
                                    (
                                        <ListGroup variant='flush'>
                                            {order.orderItems.map((item, i) => (
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
                                        <Col>${addDecimals(order.itemsPrice)}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${addDecimals(order.shippingPrice)}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${addDecimals(order.taxPrice)}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${addDecimals(order.totalPrice)}</Col>
                                    </Row>
                                </ListGroupItem>
                                {!order.isPaid && (
                                    <ListGroupItem>
                                        {/* { && <Loader />} */}
                                        {/* {!sdkReady ? <Loader /> : ( */}
                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />

                                    </ListGroupItem>
                                )}
                                {loadingDeliver && <Loader />}
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroupItem>
                                        <Button type='button' className='col-12' onClick={deliverHandler}>Mark As Delivered</Button>
                                    </ListGroupItem>
                                )}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
        )
    )
}

export default OrderScreen
