import { notFound } from "next/navigation";
import { getPostList, getCategoryList } from "@/app/_libs/microcms"
import { POST_LIST_LIMIT, CATEGORY_LIST_LIMIT } from "@/app/_constants"
import PostCategoryList from "@/app/_components/PosCategorytList"
import CategoryList from "@/app/_components/CategoryList"
import Pagination from "@/app/_components/Pagination"
import styles from './page.module.scss'
import categoryStyles from "@/app/_components/CategoryList/index.module.scss"

type Props = {
  params: Promise<{
    id: string;
    current: string;
  }>;
}

export async function generateStaticParams() {
  const categoryData = await getCategoryList();
  return categoryData.contents.map((category) => ({
    id: category.id,
  }));
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const { current: currentStr } = await params;
  const current = parseInt(currentStr, 10);

  if(Number.isNaN(current) || current < 1) {
    notFound();
  }

  // カテゴリーの存在確認
  const categoryData = await getCategoryList();
  const category = categoryData.contents.find((cat) => cat.id === id);

  if (!category) {
    notFound(); // カテゴリーが存在しない場合は 404 ページに遷移
  }

  // 特定カテゴリーの投稿を取得
  const { contents: postData, totalCount } = await getPostList({
    limit: CATEGORY_LIST_LIMIT,
    filters: `category[equals]${id}`,
    offset: CATEGORY_LIST_LIMIT * (current - 1)
  });

  const fullData = await getPostList({ limit: POST_LIST_LIMIT });

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
        <h1 className={styles.heading}>{category.name}</h1>
        <PostCategoryList posts={postData} />
        <Pagination totalCount={totalCount} current={current} basePath={`/get/category/${category.id}`} />
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

// export default CategoryPage;
