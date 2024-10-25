import Image from 'next/image'
import Link from 'next/link'

import Nav from '@/app/components/nav'
import Hamburger from '@/app/components/hamburger'

import header from '@/app/styles/layout/Header.module.scss'

export default function Header() {
  return (
    <header className={header['l-header']}>
      <div className={header['l-header__outer']}>
        <div className={header['l-header__inner']}>
          <div className={header['l-header__row']}>
            <h1 className={header['l-header__logo']}>
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
            <div className={header['l-header__ctrl']}>
              <Nav />
              <Hamburger />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}