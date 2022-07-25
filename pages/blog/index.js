/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import { authPage } from '../../middleware/auth';
import styles from './Blog.module.css';

export async function getServerSideProps({ query: { page = 1 } }) {

	const Postsres = await fetch(`https://gorest.co.in/public/v2/posts?page=${page}`);
	const posts = await Postsres.json();
	return {
		props: {
			posts,
      page: parseInt(page),
		}
	}
}



export default function posts(props) {
  const { posts, page } = props;
  const router = useRouter();

  function detailHandler(id) {
    router.push(`/blog/${id}`);
  }
  
	return (
    <>
      <div>
        <h1 className='title' >Blogsite</h1>
        <p className={styles.subtitle}>I will help you read blogs in a more satisfying way</p>
      </div>
      <div className={styles['card-container']}>
        {posts.map(post => {
        return (
          <div key={post.id} className={styles.card}>
            <h3 className={styles['card-title']}>{post.title}</h3>
            <hr className={styles.line}/>
            <p className={styles['card-content']} >{post.body}</p>
            <button onClick={detailHandler.bind(this, post.id)} className={styles['card-btn']}>Read More</button>
          </div>
          )
        })}
      </div>
      <div className={styles['btn-container']}>
        <button onClick={() => router.push(`/blog/?page=${page - 1}`)} className={styles.btn}>
          Prev
        </button>
        <span className={styles['curr-page']}>{page}</span>
        <button onClick={() => router.push(`/blog/?page=${page + 1}`)} className={styles.btn}>
          Next
        </button>
      </div>
		</>
	)
}

