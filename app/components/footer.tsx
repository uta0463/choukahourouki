import footer from '@/app/styles/layout/Footer.module.scss'

export default function Footer() {
  return (
    <footer className={footer['l-footer']}>
      <div className={footer['l-footer__outer']}>
        <div className={footer['l-footer__inner']}>
          <p className={footer['l-footer__copyright']}>&copy;cyoukahourouki</p>
        </div>
      </div>
    </footer>
  )
}