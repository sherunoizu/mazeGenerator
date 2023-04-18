import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'

const inter = Inter({ subsets: ['latin'] })

export default function Congratulations() {
  return (
    <>
      <Head>
        <title>Maze App - Completed</title>
        <meta name="description" content="Maze App for Avalon Innovations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <h1 className={styles.body}>Congratulations</h1>
      </main>
    </>
  )
}
