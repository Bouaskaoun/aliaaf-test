import React, {useState} from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';

import { db } from '../firbase.config';
import { storage } from '../firbase.config';


import { toast } from 'react-toastify';
import '../styles/login.css';

const AddProducts = () => {

  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [file, setFile] = useState('null')

  const addProduct = async(e) => {
    e.preventDefault()
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {},
      (error) => {
        toast.error(error.message)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          const randomId = Math.random().toString(36).substring(2, 15)
          await setDoc(doc(db,'products',randomId),{
            id: randomId,
            productName,
            category,
            price,
            imgUrl: downloadURL,
          })
        });
      }
    );
    toast.success('Object Created')
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
                    placeholder='ProductName'
                    value={productName}
                    onChange={e => setProductName(e.target.value)} 
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
                    type='number' 
                    placeholder='Price'
                    value={price}
                    onChange={e => setPrice(e.target.value)} 
                    />
                </FormGroup>
                <FormGroup className='form__group'>
                    <input 
                    type='file'
                    onChange={e => setFile(e.target.files[0])} 
                    />
                </FormGroup>
                <button type='submit' className='buy__btn auth__btn'>Create a Product</button>
                </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default AddProducts