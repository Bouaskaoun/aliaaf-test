import React, { useState, useEffect } from 'react';

import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container } from 'reactstrap';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase.config';
//mport { deleteUser } from "firebase/auth";

//import { toast } from 'react-toastify';

const UsersList = () => {
    
    const [users, setUsers] = useState([])

    // delete document from firestore database

    const deleteUser =  async (uid) => {}
    
    // const deletUser = async (id) => {
    //     // try {
    //     //     await deleteDoc(doc(db, "users", id));
    //     //     toast.success('User deleted successfully');
    //     // } catch (error) {
    //     //     toast.error('Somthing went wrong');
    //     // }
    //     deleteUser(id).then(() => {
    //         console.log('User deleted successfully');
    //         }).catch((error) => {
    //         console.log(error);
    //         });
    // }

    useEffect(() => {
      async function fetchUsers() {
          const data = []
          const querySnapshot = await getDocs(collection(db, "users"));
          querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
              data.push(doc.data());
          });
  
          setUsers(data);
      }
  
      fetchUsers();
    }, []);

  return (
    <Helmet title='Users'>
        <CommonSection title='Users' />
        <section>
            <Container>
                <div className='container'>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((item, index) =>(
                                    <tr key={index}>
                                        <th scope="row">{index}</th>
                                        <td>{item.displayName}</td>
                                        <td>{item.email}</td>
                                        <td className='d-flex align-items-center justify-content-between'>
                                            <span onClick={()=>deleteUser(item.uid)}><i className="ri-delete-bin-7-line"></i></span>
                                            <span><i className="ri-pencil-line"></i></span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>        
                </div>
            </Container>
        </section>
    </Helmet>
    
  )
}

export default UsersList