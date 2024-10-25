import { fetchPosts } from '@/app/api/microcms';

import card from '@/app/styles/object/component/Card.module.scss'

type Post = {
  id: string;
  title: string;
  content: string;
  eyecatch?: {
    url: string; // 画像のURL
    width: number;
    height: number;
  };
  publishedAt: string; // 投稿日時
  category?: {
    name: string
  };
  latitude: number;
  longitude: number;
}

// この関数は React Server Component として動作し、await をトップレベルで使用できます
export default async function Post() {
  const posts: Post[] = await fetchPosts(); // 非同期でデータを取得
  // console.log('Rendering posts:', posts);

  if (!Array.isArray(posts)) {
    return <div>Error: Posts is not an array</div>;
  }

  // 日付フォーマット関数（形式を指定してフォーマット）
  const formatDate = (dateString: string, format: 'YYYY-MM-DD' | 'YYYY.MM.DD') => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    if (format === 'YYYY-MM-DD') {
      return `${year}-${month}-${day}`;
    } else if (format === 'YYYY.MM.DD') {
      return `${year}.${month}.${day}`;
    }
  };

  return (
    <div className={card.container}>
      <div className={card.row}>
        {posts.map((post) => (
          <div key={post.id} className={card.col}>

            <div className={card.item}>
              <a href="URL" className={card.wrap}>
                <div className={card.item__head}>
                  {post.eyecatch && (
                  <figure className={card.item__img}>
                    <img
                      src={post.eyecatch.url}
                      alt={post.title}
                    />
                  </figure>
                  )}
                </div>
                <div className={card.item__body}>
                  <time dateTime={formatDate(post.publishedAt, 'YYYY-MM-DD')} className={card.item__date}>
                    {formatDate(post.publishedAt, 'YYYY.MM.DD')}
                  </time>
                  <h2 className={card.item__label}>{post.category?.name}</h2>
                </div>
              </a>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
