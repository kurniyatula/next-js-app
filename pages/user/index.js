import { useState } from "react";
import { authPage } from "../../middleware/auth";
import { useRouter } from "next/router";
import Input from "../../components/Input";
import styles from './User.module.css';

export async function getServerSideProps(context) {
  const { token } = await authPage(context);

  const userReq = await fetch('https://gorest.co.in/public/v2/users/', {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  const users = await userReq.json();

  return { 
    props: {
      token,
      users,
    } 
  }
}

export default function UserIndex(props) {
  const [users, setUsers] = useState(props.users);
  const [input, setInput] = useState('');
  const router = useRouter();

  function fieldHandler(e) {
    setInput(e.target.value)
  }

  async function searchHandler(e) {
    e.preventDefault();

    const userFound = users.filter(user => {
      if (input === "") {
        //if query is empty
        return user;
      } else if (user.name.toLowerCase().includes(input.toLowerCase())) {
        //returns filtered array
        return user;
      }
    });

    setUsers(userFound);
  }

  async function deleteHandler(id, e) {
    e.preventDefault();

    const { token } = props;

    const alert = confirm('Apakah data ini akan dihapus?');
    if (alert) {
    
      const deleteUser = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      // const resDelete = await deleteUser.json();

      const usersFiltered = users.filter(user => {
        return user.id !== id && user;
      });
      setUsers(usersFiltered);
    }
  }

  function updateHandler(id) {
    router.push(`/user/${id}`);
  }
  
  return (
    <div>
      <h1 className="title">List User</h1>
      <div className={styles['user-container']}>
        <form onSubmit={searchHandler.bind(this)} className={styles.form}>
          <Input
              onChange={fieldHandler.bind(this)} 
              name='name' type="text" 
              placeholder='Search' />
          <button className={styles['btn-user']}>Search</button>
        </form>
        { users.map (user => {
          return (
            <div key={user.id} className={styles['list-container']}>
              <h3 className={styles.name}>{user.name}</h3>
              <span className={styles.status}>{user.status}</span>
              <p className={styles.email}>{user.email}</p>
              <button className={styles['btn-user']} onClick={updateHandler.bind(this, user.id)}>Edit</button>
              <button className={styles['btn-user']} onClick={deleteHandler.bind(this, user.id)}>Delete</button>
              <hr />
            </div>
          )
        })}
      </div>
    </div>
  )
}
