import Header from '@/app/components/header'
import Footer from '@/app/components/footer'

import container from '@/app/styles/layout/Container.module.scss'
import main from '@/app/styles/layout/Main.module.scss'
import wrapper from '@/app/styles/layout/Wrapper.module.scss'

export default function Layout({ children }: {children: React.ReactNode}) {
  return (
    <>
      <Header />

      <div className={container['l-container']}>
        <main className={main['l-main']}>
          <div className={wrapper['l-wrapper__outer']}>
            <div className={wrapper['l-wrapper__inner']}>
              { children }
            </div>
          </div>
        </main>
        
        <Footer />

      </div>
    </>
  )
}