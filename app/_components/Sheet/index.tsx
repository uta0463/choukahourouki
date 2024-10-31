import Header from '@/app/_components/Header'
import Footer from '@/app/_components/Footer'

import "@/app/styles/globals.scss"
import styles from './index.module.scss'

type Props = {
  children: React.ReactNode
}

export default function Sheet({ children }: Props) {
  return (
    <>
      <Header />
      <div className={styles['container']}>
        <main className={styles['main']}>
          <div className="l-wrapper__outer">
            <div className="l-wrapper__inner">
              { children }
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}