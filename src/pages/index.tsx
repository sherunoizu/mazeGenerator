import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import Maze from '@/components/Maze'
import { MazeProvider } from '@/components/MazeContext'
import Controls from '@/components/Controls'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Maze App</title>
        <meta name="description" content="Maze App for Avalon Innovations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className} ${styles.main}`}>
        <div className={styles.content}>
          <h1 className={styles.heading}>Maze Generator</h1>
          <MazeProvider>
            <Maze></Maze>
            <Controls></Controls>
          </MazeProvider>
        </div>
      </main>
    </>
  )
}
