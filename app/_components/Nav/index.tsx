"use client"; // クライアントコンポーネントであることを宣言

import { useEffect } from 'react';
import Link from 'next/link'

import Anchor from '@/app/_libs/anchor';

import styles from './index.module.scss'

export default function Nav() {
  useEffect(() => {
    Anchor.init();
  }, []);

  return (
    <nav className={styles['l-nav']}>
      <ul className={styles['l-nav__menu']}>
        <li className={styles['l-nav__item']}>
          <Link href="/get/">釣果</Link>
        </li>
        <li className={styles['l-nav__item']}>
          <Link href="/area/">エリア</Link>
        </li>
      </ul>
    </nav>
  )
}