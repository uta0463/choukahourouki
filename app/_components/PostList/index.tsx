import React from 'react';
import Image from 'next/image';
import type { Post } from "@/app/_libs/microcms";

import styles from './index.module.scss'

type PostListProps = {
  posts: Post[];
};

const PostList: React.FC<PostListProps> = ({ posts }) => {

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
    <div className={styles.container}>
      <div className={styles.row}>
        {posts.map((post) => (
          <div key={post.id} className={styles.col}>

            <div className={styles.item}>
              <a href={`/get/${post.id}`} className={styles.wrap}>
                <div className={styles.item__head}>
                  {post.eyecatch && (
                  <figure className={styles.item__img}>
                    {/* <img
                      src={post.eyecatch.url}
                    /> */}
                    <Image
                      src={post.eyecatch?.url || ''}
                      alt="アイキャッチ画像"
                      width={410} // 適切な幅を指定
                      height={230} // 適切な高さを指定
                      // layout="responsive" // 自動サイズ調整
                    />
                  </figure>
                  )}
                </div>
                <div className={styles.item__body}>
                  <time dateTime={formatDate(post.publishedAt, 'YYYY-MM-DD')} className={styles.item__date}>
                    {formatDate(post.publishedAt, 'YYYY.MM.DD')}
                  </time>
                  <h2 className={styles.item__label}>{post.category.name}</h2>
                </div>
              </a>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;