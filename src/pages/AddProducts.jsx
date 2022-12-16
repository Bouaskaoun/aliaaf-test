import React, {useState} from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase.config';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userRequest } from '../requestMethods';
import missingFile from '../assets/images/missing-file.jpg';
import '../styles/login.css';

const AddProducts = () => {

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [author, setAuthor] = useState('')
  const [desc, setDesc] = useState('')
  const [img, setImg] = useState(null)
  const [pdf, setPdf] = useState(null)

  const addProduct = async(e) => {
    e.preventDefault()
    let imgUrl = ''
    if(img == null){
      imgUrl = missingFile
    }
    else{
      const storageRef = ref(storage, `imgFiles/${img.name}`);
      const uploadTaskImg = uploadBytesResumable(storageRef, img);
      imgUrl = await getDownloadURL(uploadTaskImg.snapshot.ref)
    }
    const storagePdfRef = ref(storage, `pdfFiles/${pdf.name}`);
    const uploadTaskPdf = uploadBytesResumable(storagePdfRef, pdf);
    const pdfUrl = await getDownloadURL(uploadTaskPdf.snapshot.ref)
    
    await userRequest.post('products', {
      title: title,
      category: category,
      author: author ? author : 'Anonymous',
      desc: desc ? desc : 'No description',
      img: imgUrl,
      pdf: pdfUrl
    })
    .then(() => {
      setTitle('')
      setAuthor('')
      setDesc('')
      e.target.reset();
      toast.success('Product Created')
    })
    .catch(err => {
      toast.error(err.response.data.message)
    })
  }

  return (
    <Helmet title='AddProduct'>
      <section>
        <Container>
          <Row>
            <Col lg='6' className='m-auto'>
              <h3 className='fw-bold mb-4'>Add Product</h3>              
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
                  <FormGroup className='newUserItem'>
                      <label>Image</label>
                      <input 
                      type='file'
                      accept="image/png, image/jpeg"
                      onChange={e => setImg(e.target.files[0])} 
                      />
                  </FormGroup>
                  <FormGroup className='newUserItem'>
                      <label>Pdf</label>
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