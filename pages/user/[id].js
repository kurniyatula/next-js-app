/* eslint-disable react-hooks/exhaustive-deps */
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { authPage } from "../../middleware/auth";
import Input from "../../components/Input";
import styles from '../../styles/Home.module.css';

export async function getServerSideProps(context) {

  const { token } = await authPage(context);

  const { id } = context.query;
  
  const userReq = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });

  const userData = await userReq.json();
  
  return { 
    props: {
    token,
    user: userData,
    } 
  }
  }

export default function UserUpdate(props) {

  const { user } = props;
  
  const [fields, setFields] = useState({ 
  email: user.email, 
  name: user.name,
  gender: user.gender,
  status: user.status,
  });

  const [status, setStatus] = useState('');

  const router = useRouter();

  async function updateHandler(e) {
  e.preventDefault();

  setStatus('loading');

  const { token } = props;

  const updateReq = await fetch('https://gorest.co.in/public/v2/users/' + user.id, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(fields),
  });

  if(!updateReq.ok) return setStatus('error')

  const updateRes = await updateReq.json();

  setStatus('success');

  router.push('/user');
  }

  function fieldHandler(e) {
  const name = e.target.getAttribute('name');

  setFields({
    ...fields,
    [name]: e.target.value
  })
  
  }
  return (
  <div>
    <h1 className="title">Edit User Data</h1>
    <div className={styles['form-container']}>
      <form onSubmit={updateHandler.bind(this)}>
        <Input
          label='Email'
          name='email'
          onChange={fieldHandler.bind(this)} 
          type="email" 
          placeholder='Email'
          defaultValue={user.email} />
        <Input
          label='Nama'
          onChange={fieldHandler.bind(this)} 
          name='name' 
          type="text" 
          placeholder='Nama'
          defaultValue={user.name} />
        <Input
          label='Gender'
          onChange={fieldHandler.bind(this)} 
          name='gender' 
          type="text" 
          placeholder='male or female'
          defaultValue={user.gender} />
        <Input
          label='Status'
          onChange={fieldHandler.bind(this)} 
          name='status' type="text" 
          placeholder='active or inactive'
          defaultValue={user.status} />
      <button type='submit' className={styles['btn-register']}>Save Changes</button>
      </form>
    </div>
  </div>
  )
}
