import React, {useState} from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';

import { db } from '../firebase.config';
import { storage } from '../firebase.config';


import { toast } from 'react-toastify';
import '../styles/login.css';

const AddProducts = () => {

  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [avgRating, setAvgRating] = useState('')
  const [description, setDescription] = useState('')
  const [imgFile, setImgFile] = useState(null)
  const [pdfFile, setPdfFile] = useState(null)

  const addProduct = async(e) => {
    e.preventDefault()
    const storageRef = ref(storage, `imgFiles/${imgFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imgFile);
    const storagePdfRef = ref(storage, `pdfFiles/${pdfFile.name}`);
    const uploadTaskPdf = uploadBytesResumable(storagePdfRef, pdfFile);

    uploadTask.on("state_changed",
      (snapshot) => {},
      (error) => {
        toast.error(error.message)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          const randomId = Math.random().toString(36).substring(2, 15)
          setDoc(doc(db,'products',randomId),{
            id: randomId,
            productName: productName,
            category: category,
            price: price,
            shortDesc: shortDesc,
            avgRating: avgRating,
            description: description,
            imgUrl: downloadURL,
            pdf: await getDownloadURL(uploadTaskPdf.snapshot.ref),
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
                    type='text' 
                    placeholder='ShortDesc'
                    value={shortDesc}
                    onChange={e => setShortDesc(e.target.value)} 
                    />
                </FormGroup>
                <FormGroup className='form__group'>
                    <input 
                    type='number' 
                    placeholder='avgRating'
                    value={avgRating}
                    onChange={e => setAvgRating(e.target.value)} 
                    />
                </FormGroup>
                <FormGroup className='form__group'>
                    <input 
                    type='text' 
                    placeholder='description'
                    value={description}
                    onChange={e => setDescription(e.target.value)} 
                    />
                </FormGroup>
                <FormGroup className='form__group'>
                    <input 
                    type='file'
                    accept="image/png, image/jpeg"
                    onChange={e => setImgFile(e.target.files[0])} 
                    />
                </FormGroup>
                <FormGroup className='form__group'>
                    <input 
                    type='file'
                    accept=".pdf"
                    onChange={e => setPdfFile(e.target.files[0])} 
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