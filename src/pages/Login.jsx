import React, {useState} from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import { login } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/login.css'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    login(dispatch, { username, password })
      .then((res) => {
        setLoading(false)
        toast.success('Successfully logged In')
      })
      .catch (error => {
        setLoading(false)
        toast.error(error)
      })
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