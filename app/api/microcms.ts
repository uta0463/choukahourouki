import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

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
};

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'X-API-KEY': API_KEY,
    'Cache-Control': 'no-store',
  },
});

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await client.get('/chouka', {
      params: {
        limit: 100, // 必要に応じて件数を調整
      },
    });
    return response.data.contents; // contents に eyecatch と publishedAt を含む
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};
