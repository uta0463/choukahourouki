import Layout from '@/app/components/layout'

import Page from '@/app/styles/object/project/Page.module.scss'

const Home = async () => {
  return (
    <Layout>
      <section className={Page.section}>
        <h2 className={Page.heading}>マップ</h2>
      </section>
    </Layout>
  );
}

export default Home;
