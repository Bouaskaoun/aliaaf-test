import React, {useState} from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import axios from 'axios';


import { toast } from 'react-toastify';
import '../styles/login.css';

const AddProducts = () => {

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [author, setAuthor] = useState('')
  const [desc, setDesc] = useState('')
  const [img, setImg] = useState(null)
  //const [pdf, setPdf] = useState(null)

  const addProduct = async(e) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:5000/api/products', {
        title,
        category,
        author,
        desc,
        img
      })
      .then(res => {
        console.log(res)
      })
      toast.success('Object Created')
    } catch (err) {
      toast.error(err.message)
    }
    
  }

  return (
    <Helmet title='AddProduct'>
      <section>
        <Container>
          <Row>
            <Col lg='6' className='m-auto text-center'>
                <h3 className='fw-bold mb-4'>Add Product</h3>
                <Form className='auth__form' onSubmit={addProduct}>
                <FormGroup className='form__group'>
                    <input 
                    type='text' 
                    placeholder='Title'
                    value={title}
                    onChange={e => setTitle(e.target.value)} 
                    />
                </FormGroup>
                <FormGroup className='form__group'>
                    <input 
                    type='text' 
                    placeholder='Category'
                    value={category}
                    onChange={e => setCategory(e.target.value)} 
                    />
                </FormGroup>
                <FormGroup className='form__group'>
                    <input 
                    type='text'
                    placeholder='Author'
                    value={author}
                    onChange={e => setAuthor(e.target.value)} 
                    />
                </FormGroup>
                <FormGroup className='form__group'>
                    <input 
                    type='text' 
                    placeholder='desc'
                    value={desc}
                    onChange={e => setDesc(e.target.value)} 
                    />
                </FormGroup>
                <FormGroup className='form__group'>
                    <input 
                    type='file'
                    accept="image/png, image/jpeg"
                    onChange={e => setImg(e.target.files[0])} 
                    />
                </FormGroup>
                {/* <FormGroup className='form__group'>
                    <input 
                    type='file'
                    accept=".pdf"
                    onChange={e => setPdf(e.target.files[0])} 
                    />
                </FormGroup> */}
                <button type='submit' className='auth__btn'>Create a Product</button>
                </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default AddProducts