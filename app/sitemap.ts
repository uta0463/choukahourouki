import { MetadataRoute } from 'next'
import { getAllPostList, Post } from "@/app/_libs/microcms"; // microcms.tsからgetAllPostListとPost型をインポート

const buildUrl = (path?: string) => `https://choukahourouki.vercel.app${path ?? ""}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // getAllPostList から全ての投稿を取得
  const allPosts = await getAllPostList();

  // トップページと固定ページのURL
  const staticUrls = [
    {
      url: buildUrl(),
      lastModified: now,
    },
    {
      url: buildUrl("/get"),
      lastModified: now,
    },
  ];

  // 投稿ごとのURLを生成
  const postUrls = allPosts.map((post: Post) => ({
    url: buildUrl(`/get/${post.id}`),
    lastModified: new Date(post.publishedAt),
  }));

  // 静的URLと投稿URLを合わせて返す
  return [...staticUrls, ...postUrls];
}
