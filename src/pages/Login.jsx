import React, {useState} from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import { Link } from 'react-router-dom';
import { login } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

import '../styles/login.css'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  //const navigate = useNavigate()

  // const signIn = async (e)=>{
  //   e.preventDefault()
  //   setLoading(true)

  //   try {
  //     const userCredential = await signInWithEmailAndPassword(auth,email,password)
  //     // eslint-disable-next-line  
  //     const user = userCredential.user
  //     setLoading(false)
  //     toast.success('Successfully logged In')
  //     navigate('/home')

  //   } catch (error) {
  //     setLoading(false)
  //     toast.error(error.message)
  //   }
  // }

  //const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      login(dispatch, { username, password });
      setLoading(false)
      toast.success('Successfully logged In')
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
  };

  return (
    <Helmet title='Login'>
      <section>
        <Container>
          <Row>
          {
              loading ? (
                <Col lg='12' className='text-center'>
                  <h5 className='fw-bold'>Loading...</h5>
                </Col>
              ) : (
                <Col lg='6' className='m-auto text-center'>
                  <h3 className='fw-bold mb-4'>Login</h3>
                  <Form className='auth__form'onSubmit={handleClick}>
                    <FormGroup className='form__group'>
                      <input 
                        type='text' 
                        placeholder='Enter your Username'
                        value={username}
                        onChange={e => setUsername(e.target.value)} 
                      />
                    </FormGroup>
                    <FormGroup className='form__group'>
                      <input 
                        type='password' 
                        placeholder='Enter your password'
                        value={password}
                        onChange={e => setPassword(e.target.value)} 
                      />
                    </FormGroup>
                    <button type='submit' className='auth__btn'>Login</button>
                    <p>Don't have an account? <Link to='/signup'>Create an account</Link></p>
                  </Form>
                </Col>
              )
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Login