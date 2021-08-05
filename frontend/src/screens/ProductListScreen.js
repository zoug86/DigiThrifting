import React, { useEffect } from 'react'
import { Table, Button, Row, Col, Pagination } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { LinkContainer } from 'react-router-bootstrap'
import { PRODUCT_CREATE_RESET, product_CREATE_RESET } from '../constants/productConstants'
import Paginate from '../components/Paginate'


const ProductListScreen = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()
    const { products, error, loading, pages, page } = useSelector(state => state.productList)
    const { userInfo } = useSelector(state => state.userLogin)
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = useSelector(state => state.productDelete)
    const { loading: loadingCreate, success: successCreate, error: errorCreate, product: createdProduct } = useSelector(state => state.productCreate)

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts('', pageNumber))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber])

    const createProductHandler = () => {
        //dispatch(createProduct())
        dispatch(createProduct())
    }
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            //dispatch(deleteProduct(id))
            dispatch(deleteProduct(id))
        }
    }
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-end">
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Table striped bordered hover size='sm' variant='light' className='text-center'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>Price</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>
                                        {product.category}
                                    </td>
                                    <td>
                                        {product.brand}
                                    </td>
                                    <td className='d-flex'>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button varient='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={pages} page={page} isAdmin={true} />
                </>
            )}
        </>
    )
}

export default ProductListScreen
