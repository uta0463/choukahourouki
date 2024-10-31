import Image from 'next/image'
import Link from 'next/link'

import Nav from '@/app/_components/Nav'
import Hamburger from '@/app/_components/Hamburger'

import styles from './index.module.scss'

export default function Header() {
  return (
    <header className={styles['l-header']}>
      <div className={styles['l-header__outer']}>
        <div className={styles['l-header__inner']}>
          <div className={styles['l-header__row']}>
            <h1 className={styles['l-header__logo']}>
              <Link href="/">
                <Image
                  src="/logo.svg"
                  alt="釣果放浪記"
                  width={50}
                  height={46}
                  priority
                />
              </Link>
            </h1>
            <div className={styles['l-header__ctrl']}>
              <Nav />
              <Hamburger />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}