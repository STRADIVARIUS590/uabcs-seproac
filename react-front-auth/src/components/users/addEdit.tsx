import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate } from 'react-router-dom';
import AddEditForm from './AddEditForm';
import { Api } from '../../services/Api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
 
const AddEditUserPage = () => {

  const { id } = useParams<{ id?: string }>(); // Grab the id from the URL, optional

  const navigate = useNavigate();

  const [user, setUser] = useState({
    'name': '',
    'email': '',
    'password': '',
    'id' : id || 0,
    // 'role_id' : 0
  })

  const [isLoading, setIsLoading] = useState(true);

  const { token } = useSelector((state: RootState) => state.auth)

  const loadUser = async () => {

        if(id){

            const response = await Api.get('/users/get/' + id, {
                Authorization: 'Bearer ' + token,
                accept: 'application/json'
            })
            
            const result = await response.data
            
            setUser(result);
        }
        setIsLoading(false);


    }

    useEffect(() => {
        loadUser();
    }, []);

console.log(user);

const initialValues = {
    'name': user?.name??'' ,
    'email': user?.email?? '',
    'password' : '',
    'id' : user?.id ?? '0'  ,
    // 'role_id' : user?.role_id ?? 0,
};

  const isEditMode = !!id; // True if we are editing

  // Submit handler
  const handleSubmit = async (values: typeof initialValues) => {
    
    if (isEditMode) {    
      const response = await Api.put('/users/' + id, values, 
            {
              Authorization: 'Bearer ' + token,
              "Content-Type": 'application/json',
              accept: 'application/json'
            }
        );

    } else {
      const response = await Api.post('/users', values);
      console.log(response);

    }
    navigate('/users'); // Redirect after submission
  };

  if(isLoading) return <p>Loading</p>;  

  return (
    <div>
      <h1>{isEditMode ? 'Edit User' : 'Add User'}</h1>
      <AddEditForm initialValues={initialValues} onSubmit={handleSubmit} isEditMode={isEditMode} />
    </div>
  );
};

export default AddEditUserPage;
