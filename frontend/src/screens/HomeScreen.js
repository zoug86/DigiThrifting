import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch();
    const { products, loading, error, pages, page } = useSelector(state => state.productList)
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Helmet>
                <title>Welcome to Applezon | Home</title>
                <meta name='description' content='We sell the best products for cheap' />
                <meta name='keywords' content='electronics, buy electronics, cheap electronics' />
            </Helmet>
            {!keyword && <ProductCarousel />}
            <h1>Latest Products</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Row>
                        {products.map(product =>
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        )}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </>
            )
            }

        </>

    )
}

export default HomeScreen
