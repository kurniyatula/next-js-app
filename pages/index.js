/* eslint-disable react-hooks/exhaustive-deps */
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { unauthPage } from "../middleware/auth";
import Input from "../components/Input";
import styles from '../styles/Home.module.css';

export async function getServerSideProps(context) {
  await unauthPage(context);

  return { props: {} }
}

export default function UserPage() {
  const [fields, setFields] = useState({ 
    email: '', 
    name: '',
    gender: '',
    status:'',
  });

  const [status, setStatus] = useState('');

  const router = useRouter();

  useEffect(() => {
    const tokenCookie = Cookie.get('token');

    if(tokenCookie) return router.push('/blog')
  }, []);

  async function registerHandler(e) {
    e.preventDefault();

    setStatus('loading');
    const token = 'd07fa002cf716ffa0be8cf5618676acf270bc997391ac3e425790bc5f79df54f';

    const registerReq = await fetch('https://gorest.co.in//public/v2/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(fields),
    });

    if(!registerReq.ok) return setStatus('error' + registerReq.status)

    const registerRes = await registerReq.json();

    setStatus('success');
    Cookie.set('token', token);
    router.push('/blog');
  }

  function fieldHandler(e) {
    const name = e.target.getAttribute('name');

    console.log(name);

    setFields({
      ...fields,
      [name]: e.target.value
    })
    
  }
  return (
    <>
      <h1 className="title">Register</h1>
      <div className={styles['form-container']}>
        <form onSubmit={registerHandler.bind(this)}>
          <Input
            label='Email'
            name='email'
            onChange={fieldHandler.bind(this)} 
            type="email" 
            placeholder='Email' />
          <Input
            label='Nama'
            onChange={fieldHandler.bind(this)} 
            name='name' 
            type="text" 
            placeholder='Nama' />
          <Input
            label='Gender'
            onChange={fieldHandler.bind(this)} 
            name='gender' 
            type="text" 
            placeholder='male or female' />
          <Input
            label='Status'
            onChange={fieldHandler.bind(this)} 
            name='status' type="text" 
            placeholder='active or inactive' />
          <br />
          <button type='submit' className={styles['btn-register']}>Register</button>
        </form>
      </div>
    </>
  )
}
