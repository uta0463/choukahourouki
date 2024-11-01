import Link from 'next/link';
import { CATEGORY_LIST_LIMIT } from "@/app/_constants"

import styles from './index.module.scss'

type Props = {
  totalCount: number;
  current?: number;
};

export default function Pagination({ totalCount, current = 1 }: Props) {
  const pages = Array.from({
    length: Math.ceil(totalCount / CATEGORY_LIST_LIMIT)
  },
    (_, i) => i + 1
  );

  return (
    <nav>
      <ul className={styles.menu}>
        {pages.map((p) => (
          <li className={styles.item} key={p}>
            {current !== p ? (
              <Link href={`/get/p/${p}`}>
                {p}
              </Link>
            ) : (
              <span className={`${styles.item} ${styles.current}`}>
                {p}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
