"use client"; // クライアントコンポーネントであることを宣言

import { useEffect } from 'react';
import Link from 'next/link'

import Anchor from '@/app/components/_utils/anchor';

import nav from '@/app/styles/layout/Nav.module.scss'

export default function Nav() {
  useEffect(() => {
    Anchor.init();
  }, []);

  return (
    <nav className={nav['l-nav']}>
      <ul className={nav['l-nav__menu']}>
        <li className={nav['l-nav__item']}>
          <Link href="/catch/">釣果</Link>
        </li>
        <li className={nav['l-nav__item']}>
          <Link href="/map/">マップ</Link>
        </li>
        {/* <li className={nav['l-nav__item']}>
          <Link href="#category">魚種</Link>
        </li> */}
      </ul>
    </nav>
  )
}