import styles from './index.module.scss'

export default function Footer() {
  return (
    <footer className={styles['l-footer']}>
      <div className={styles['l-footer__outer']}>
        <div className={styles['l-footer__inner']}>
          <p className={styles['l-footer__copyright']}>&copy;cyoukahourouki</p>
        </div>
      </div>
    </footer>
  )
}