import React, {useState} from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase.config';


import { toast } from 'react-toastify';
import '../styles/login.css';
import { userRequest } from '../requestMethods';

const AddProducts = () => {

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [author, setAuthor] = useState('')
  const [desc, setDesc] = useState('')
  const [img, setImg] = useState(null)
  const [pdf, setPdf] = useState(null)

  // const addProduct = async(e) => {
  //   e.preventDefault()
  //   const storageRef = ref(storage, `imgFiles/${img.name}`);
  //   const uploadTask = uploadBytesResumable(storageRef, img);
  //   const storagePdfRef = ref(storage, `pdfFiles/${pdf.name}`);
  //   const uploadTaskPdf = uploadBytesResumable(storagePdfRef, pdf);

  //   uploadTask.on("state_changed",
  //     (snapshot) => {},
  //     (error) => {
  //       toast.error(error.message)
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
  //         try {
  //           await axios.post('http://localhost:5000/api/products', {
  //             title: title,
  //             category: category,
  //             author: author,
  //             desc: desc,
  //             img: downloadURL,
  //             pdf: await getDownloadURL(uploadTaskPdf.snapshot.ref),
  //           })
  //           .then(res => {
  //             console.log(res)
  //           })
  //           toast.success('Object Created')
  //         } catch (err) {
  //           toast.error(err.message)
  //         }
  //       });
  //     }
  //   );
  //   toast.success('Object Created')
  // }

  const addProduct = async(e) => {
    e.preventDefault()
    const storageRef = ref(storage, `imgFiles/${img.name}`);
    const uploadTaskImg = uploadBytesResumable(storageRef, img);
    const storagePdfRef = ref(storage, `pdfFiles/${pdf.name}`);
    const uploadTaskPdf = uploadBytesResumable(storagePdfRef, pdf);

    try {
       await userRequest.post('products', {
        title: title,
        category: category,
        author: author,
        desc: desc,
        img: await getDownloadURL(uploadTaskImg.snapshot.ref),
        pdf: await getDownloadURL(uploadTaskPdf.snapshot.ref)
      })
      .then(() => toast.success('Object Created'))
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return (
    <Helmet title='AddProduct'>
      <section>
        <Container>
          <Row>
            <Col lg='6' className='m-auto'>
              <h3 className='fw-bold mb-4'>Add Product</h3>
              {/* <Form className='auth__form' onSubmit={addProduct}>
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
                    <textarea 
                    id="description"
                    name="description"
                    placeholder='description'
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
                <FormGroup className='form__group'>
                    <input 
                    type='file'
                    accept=".pdf"
                    onChange={e => setPdf(e.target.files[0])} 
                    />
                </FormGroup>
                <button type='submit' className='auth__btn'>Create a Product</button>
              </Form> */}
              
              <div className="newUser">
                <Form className='newUserForm' onSubmit={addProduct}>
                  <FormGroup className='newUserItem'>
                      <input 
                      type='text' 
                      placeholder='Title'
                      value={title}
                      onChange={e => setTitle(e.target.value)} 
                      />
                  </FormGroup>
                  <FormGroup className='newUserItem'>
                      <input 
                      type='text'
                      placeholder='Author'
                      value={author}
                      onChange={e => setAuthor(e.target.value)} 
                      />
                  </FormGroup>
                  <FormGroup className='newUserItem'>
                      {/* <input 
                      type='text' 
                      placeholder='Category'
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      /> */}
                      <select onChange={e => setCategory(e.target.value)} >
                        <option value="default">Select Category</option>
                        <option value="Textes_réglementaires">Textes réglementaires</option>
                        <option value="PFE">PFE</option>
                        <option value="Management_de_la_Production">Management de la Production</option>
                        <option value="Articles_scientifiques">Articles scientifiques</option>
                        <option value="Techniques_de_l'ingénieur">Techniques de l'ingénieur</option>
                        <option value="Normes_marocaines">Normes marocaines</option>
                        <option value="Insertion_professionnells">Insertion professionnells</option>
                        <option value="Anciens_concours_de_l'Etat">Anciens concours de l'Etat</option>
                        <option value="QHSE">QHSE</option>
                        <option value="Normes_et_référentiels">Normes et référentiels</option>
                        <option value="Gestion_de_projet">Gestion de projet</option>
                        <option value="Procédés_de_fabrication">Procédés de fabrication</option>
                        <option value="MSDA">MSDA</option>
                        <option value="GBPF">GBPF</option>
                      </select>
                  </FormGroup>
                  <FormGroup className='newUserItem'>
                      <textarea 
                      id="description"
                      name="description"
                      placeholder=' Description'
                      rows='5'
                      value={desc}
                      onChange={e => setDesc(e.target.value)}
                      />
                  </FormGroup>
                  <FormGroup>
                      <input 
                      type='file'
                      accept="image/png, image/jpeg"
                      onChange={e => setImg(e.target.files[0])} 
                      />
                  </FormGroup>
                  <FormGroup>
                      <input 
                      type='file'
                      accept=".pdf"
                      onChange={e => setPdf(e.target.files[0])} 
                      />
                  </FormGroup>
                  <button type='submit' className='newUserButton'>Create a Product</button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default AddProducts