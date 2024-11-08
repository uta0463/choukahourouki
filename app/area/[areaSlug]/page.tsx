import { getPostList, getCategoryList } from "@/app/_libs/microcms"
import { POST_LIST_LIMIT, SHOW_LIST_LIMIT } from "@/app/_constants"
import PostList from "@/app/_components/PostList"
import CategoryList from "@/app/_components/CategoryList"
import Pagination from "@/app/_components/Pagination"
import styles from './page.module.scss'
import categoryStyles from "@/app/_components/CategoryList/index.module.scss"

type Props = {
  params: Promise<{
    slug: string;
    areaSlug: string;
  }>;
}

export default async function Page({ params }: Props) {
   // params の読み込みを待機
  const { areaSlug } = await params;

  // areaSlug をデコード
  const decodedAreaSlug = decodeURIComponent(areaSlug);

  const { contents: postData, totalCount } = await getPostList({
    limit: SHOW_LIST_LIMIT,
    filters: `area[equals]${decodedAreaSlug}`,
  });

  const fullData = await getPostList({ limit: POST_LIST_LIMIT });
  const categoryData = await getCategoryList();

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

  return (
    <div className={styles.container}>

      <section className={styles.contents}>
        <h1 className={styles.heading}>{decodedAreaSlug}</h1>
        <PostList posts={postData} />
        <Pagination totalCount={totalCount} basePath={`/area/${areaSlug}`} />
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
  )
}
