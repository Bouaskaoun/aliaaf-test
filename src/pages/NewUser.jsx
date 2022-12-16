import { Container, Row, Col } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import { useState } from "react";
import { userRequest } from "../requestMethods";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/newUser.css";

export default function NewUser() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [password, setPassword] = useState('')

    const addUser = async (e) => {
        e.preventDefault()
        const user = {username, email, isAdmin, password}
        await userRequest.post('auth/register', user).then((res) => {
            setUsername('')
            setEmail('')
            setPassword('')
            setIsAdmin(false)
            //e.target.reset();
            toast.success('User has been created')
        }).catch((err) => {
            toast.error(err.response.data.message)
        })

    }

  return (
    <Helmet title='AddUser'>
    <section>
        <Container>
            <Row>
            <Col lg='6' className='m-auto'>
                <div className="newUser">
                    <h1 className="newUserTitle">New User</h1>
                    <form className="newUserForm" onSubmit={addUser}>
                        <div className="newUserItem">
                            <label>Username</label>
                            <input 
                                type='text' 
                                placeholder='Username'
                                value={username}
                                onChange={e => setUsername(e.target.value)} 
                            />
                        </div>
                        <div className="newUserItem">
                            <label>Email</label>
                            <input 
                                type='email' 
                                placeholder='Enter your email'
                                value={email}
                                onChange={e => setEmail(e.target.value)} 
                            />
                        </div>
                        <div className="newUserItem">
                            <label>Password</label>
                            <input 
                                type='password' 
                                placeholder='Enter your password'
                                value={password}
                                onChange={e => setPassword(e.target.value)} 
                            />
                        </div>
                        <div className="newUserItem">
                            <label>Status</label>
                            <div className="newUserGender">
                                <label>
                                    <input
                                    type="radio"
                                    name="status"
                                    value={true}
                                    checked={isAdmin}
                                    onChange = {(e) => setIsAdmin(e.target.value === 'true' ? true : false)}
                                    //className="form-check-input"
                                    />
                                    Admin
                                </label>
                                <label>
                                    <input
                                    type="radio"
                                    name="status"
                                    value={false}
                                    checked={!isAdmin}
                                    onChange = {(e) => setIsAdmin(e.target.value === 'true' ? true : false)}
                                    //className="form-check-input"
                                    />
                                    Not Admin
                                </label>
                            </div>
                        </div>
                        <button className="newUserButton">Create</button>
                    </form>
                </div>
            </Col>
            </Row>
        </Container>
    </section>
  </Helmet>
  );
}