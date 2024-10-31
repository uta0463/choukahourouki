import Image from 'next/image';
import { getPostList, getCategoryList, getPostDetail } from "@/app/_libs/microcms"
import { POST_LIST_LIMIT } from "@/app/_constants"
import CategoryList from "@/app/_components/CategoryList"

import styles from './page.module.scss'
import categoryStyles from "@/app/_components/CategoryList/index.module.scss"

type Props = {
  params: {
    slug: string;
  },
}

export default async function Page({ params }: Props) {
  const { slug } = await params; // paramsをawaitしてからslugを取得
  const detailData = await getPostDetail(slug);
  const fullData = await getPostList({ limit: POST_LIST_LIMIT });
  const categoryData = await getCategoryList();
  // console.log(detailData)
  
  // detailDataがundefinedの場合のエラーハンドリング
  if (!detailData) {
    return <p>投稿が見つかりませんでした。</p>;
  }

  // 投稿で使用されているカテゴリー名を抽出し、投稿数を計算
  const categoryCountMap = fullData.contents.reduce((acc, post) => {
    const categoryName = post.category?.name;
    if (categoryName) {
      acc[categoryName] = (acc[categoryName] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // カテゴリーリストに投稿数を追加し、投稿数が0でないカテゴリーのみをフィルタリング
  const categoriesWithCount = categoryData.contents
    .map((category) => ({
      ...category,
      count: categoryCountMap[category.name] || 0,
    }))
    .filter((category) => category.count > 0);

  // 日付を日本時間でフォーマットする関数
  const formatDateToJST = (dateString: string) => {
    const date = new Date(dateString);
    // // UTC+9の日本時間に変換
    // const jstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    const jstDate = new Date(date.getTime() + 0 * 60 * 60 * 1000);
    return `${jstDate.getFullYear()}年${String(jstDate.getMonth() + 1).padStart(2, '0')}月${String(jstDate.getDate()).padStart(2, '0')}日 ${String(jstDate.getHours()).padStart(2, '0')}時${String(jstDate.getMinutes()).padStart(2, '0')}分`;
  };

  return (
    <div className={styles.container}>

      <section className={styles.contents}>
        <div className={styles.head}>
          <h1 className={styles.heading}>釣果データ</h1>
        </div>

        <div className={styles.body}>

          <div className={styles.img}>
            <figure className={styles.img}>
              <Image
                src={detailData.eyecatch?.url || ''}
                alt="釣った魚"
                width={880} // 適切な幅を指定
                height={494} // 適切な高さを指定
                // layout="responsive" // 自動サイズ調整
              />
            </figure>
          </div>

          {detailData.content && (
          <div className={styles.free} dangerouslySetInnerHTML={{__html: detailData.content}}></div>
          )}

          <div className={styles.summary}>
            <dl>
              <dt>釣った日</dt>
              <dd>
                <p>{formatDateToJST(detailData.publishedAt)}</p>
              </dd>
              <dt>魚種</dt>
              <dd>
                <p>{detailData.category.name}</p>
              </dd>
              <dt>サイズ</dt>
              <dd>
                <p>{detailData.size ? detailData.size : '-'}</p>
              </dd>
              <dt>重さ</dt>
              <dd>
                <p>{detailData.weight ? detailData.weight : '-'}</p>
              </dd>
              <dt>エリア</dt>
              <dd>
                <p>{detailData.place.name} {detailData.area ? detailData.area : ''}</p>
              </dd>
            </dl>
          </div>

          <h2 className={styles.sub}>タックル</h2>
          <div className={styles.summary}>
            <dl>
              <dt>ロッド</dt>
              <dd>
                <p>{detailData.rod ? detailData.rod : '-'}</p>
              </dd>
              <dt>リール</dt>
              <dd>
                <p>{detailData.reel ? detailData.reel : '-'}</p>
              </dd>
              <dt>ルアー</dt>
              <dd>
                <p>{detailData.lure ? detailData.lure : '-'}</p>
              </dd>
            </dl>
          </div>

        </div>
      </section>

      <section id="category" className={`${categoryStyles.section} l-wrapper__over`}>
        <div className="l-wrapper__outer">
          <div className="l-wrapper__inner">
            <h2 className={categoryStyles.heading}>魚種</h2>
            <CategoryList categories={categoriesWithCount} />
          </div>
        </div>
      </section>
    </div>
  );
}

// 動的パスの生成
export async function generateStaticParams() {
  const data = await getPostList()
  return data.contents.map((post) => ({
    slug: post.id,
  }))
}
