import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
    const [keyword, setkeyword] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }
    return (
        <div>
            <Form onSubmit={submitHandler} className='d-flex'>
                <Form.Control type='text' name='q' onChange={(e) => setkeyword(e.target.value)} placeholder='Search Products...' className='me-sm-2 ms-sm-5'>

                </Form.Control>
                <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
            </Form>

        </div>
    )
}

export default SearchBox
