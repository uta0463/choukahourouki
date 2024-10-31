"use client"; // クライアントコンポーネントであることを宣言

import { useState, useEffect } from 'react'
import { BodyFix } from '@/app/_libs/bodyfix';

import styles from './index.module.scss'

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    const nextState = !isOpen
    setIsOpen(nextState)
    document.body.classList.toggle('is-open', nextState)

    // isOpenの状態に応じてlock/unlockを実行
    if (nextState) {
      BodyFix.lock();
    } else {
      BodyFix.unlock();
    }
  }

  useEffect(() => {
    BodyFix.ready(); // 初期化
  }, [])

  return (
    <button type="button" className={styles.btn} onClick={handleClick}>
      <span className={styles.bars}>
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>
  )
}