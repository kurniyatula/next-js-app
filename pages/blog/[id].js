import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './Detail.module.css';
import { authPage } from '../../middleware/auth';

export async function getServerSideProps(context) {
  // const { token } = await authPage(context);

  const { id } = context.query;
  const [PostRes, CommentRes] = await Promise.all([
    fetch(`https://gorest.co.in/public/v2/posts?id=${id}`), 
    fetch(`https://gorest.co.in/public/v2/comments/?post_id=${id}`)
  ]);
  const [post, comment] = await Promise.all([
    PostRes.json(), 
    CommentRes.json()
  ]);
  return { 
    props: { 
      post, 
      comment,
    } 
  };
}

export default function PostDetail(props) {
  const { post, comment } = props;

  return (
    <>
    <h1 className='title'>Post Detail</h1>
    <div className={styles['content-container']}>
    {post.map(item => {
      return (
        <div key={item.id}>
          <h2 className={styles['detail-title']} >{item.title}</h2>
          <div className={styles['image-container']}>
            <Image src='/post-image.jpg' width={600} height={400} alt="post-image" className={styles.image} />
          </div>
          <p>{item.body}</p>
        </div>
        )
      })}
      </div>
      <div className={styles['comment-container']}>
        <h3 className={styles.comment}>Comment..</h3>
        {comment.map(item => {
          return (
            <div key={item.id} className={styles.comment} >
              <div className={styles.user} >
                <p className={styles['comment-name']}>{item.name}</p>
                <span className={styles['comment-email']}>{item.email}</span>
              </div>
              <p className={styles['comment-body']}>{item.body}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}
