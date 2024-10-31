import React from 'react';
import type { Category } from "@/app/_libs/microcms";
import Link from 'next/link';

import styles from './index.module.scss'

type CategoryListProps = {
  categories: (Category & { count: number })[]; // 投稿数を含む型に変更
};

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.menu}>
        {categories.map((category) => (
          <li key={category.id} className={styles.item}>
            <Link href={`/get/category/${category.id}`}> {/* 各カテゴリーへのリンクを設定 */}
              {category.name} ({category.count})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
