import React from 'react';
import Link from 'next/link';
import type { Area, Post } from "@/app/_libs/microcms";
import styles from './index.module.scss';

type AreaListProps = {
  areas: Area[];
  postData: Post[];
};

const AreaList: React.FC<AreaListProps> = ({ areas, postData }) => {
  return (
    <div className={styles.container}>
      {/* area.name が postData の place.name と一致する場合のみ表示 */}
      {areas.map((area) => {
        // postData 内に一致する place.name が存在するかをチェック
        const hasMatchingPost = postData.some(
          (post) => post.place?.name === area.name
        );

        // 一致する place.name がない場合は表示しない
        if (!hasMatchingPost) {
          return null;
        }

        // post.area の重複を排除し、最初の1件だけ取得
        const displayedPosts: { [key: string]: Post } = {};
        const uniquePosts = postData.filter((post) => {
          if (post.place?.name === area.name && !displayedPosts[post.area]) {
            displayedPosts[post.area] = post;
            return true;
          }
          return false;
        });

        return (
          <div key={area.id} className={styles.item}>
            <h2 className={styles.item__label}>{area.name}</h2>
            <div className={styles.posts}>
              <div className={styles.row}>
                {/* 重複しない post.area の最初の投稿を表示 */}
                {uniquePosts.map((post) => (
                  <div key={post.id} className={styles.elem}>
                    <Link href={`/area/${encodeURIComponent(post.area)}`}>
                      <p className={styles.post__link}>{post.area}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AreaList;
