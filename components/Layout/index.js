import Footer from '../Footer';
import Header from '../Header';
import Head from 'next/head';
import styles from './Layout.module.css'

export default function Layout(props) {
  const { children } = props;
  return (
    <>
      <Head>
        <title>NextJS | Kurniyatul Blog</title>
        <meta name='description' content='Next JS Website'/>
      </Head>
      <div>
          <Header />
          <div className={styles.container}>{children}</div>
          <Footer />
      </div>
    </>
  )
}
