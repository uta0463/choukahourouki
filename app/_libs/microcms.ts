import axios from 'axios'
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from "microcms-js-sdk";

export type Post = {
  id: string;
  content: string;
  eyecatch?: MicroCMSImage;
  publishedAt: string; // 投稿日時
  createdAt: string;
  category: {
    name: string
  };
  size: string;
  weight: string;
  place: {
    name: string
  };
  area: string;
  rod: string;
  reel: string;
  lure: string;
} & MicroCMSListContent;

export type Category = {
  name: string;
} & MicroCMSListContent;

export type Area = {
  id: string;
  name: string;
} & MicroCMSListContent;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if(!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

const API_URL = `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/`;

const client = axios.create({
  baseURL: API_URL,
  headers: {
    "X-API-KEY": process.env.MICROCMS_API_KEY || "",
    "Cache-Control": "no-store",
  },
});

export const getPostList = async (queries?: MicroCMSQueries) => {
  try {
    const response = await client.get<{ contents: Post[]; totalCount: number }>("/chouka", {
      params: queries,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getPostDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  try {
    const response = await client.get<Post>(`/chouka/${contentId}`, {
      params: queries,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getCategoryList = async (queries?: MicroCMSQueries) => {
  try {
    const response = await client.get<{ contents: Category[]; totalCount: number  }>("/categories", {
      params: queries,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getAllPostList = async () => {
  let allPosts: Post[] = [];
  let offset = 0;
  const limit = 100; // 一度に取得する上限数（microCMSのAPI制限による）

  while (true) {
    try {
      const response = await client.get<{ contents: Post[]; totalCount: number }>("/chouka", {
        params: {
          offset,
          limit,
        },
      });
      
      allPosts = allPosts.concat(response.data.contents);
      
      if (allPosts.length >= response.data.totalCount) {
        break;
      }
      
      offset += limit;
    } catch (error) {
      console.error("Error fetching all posts:", error);
      throw error;
    }
  }

  return allPosts;
};


export const getAreaList = async (queries?: MicroCMSQueries) => {
  try {
    const response = await client.get<{ contents: Area[]  }>("/place", {
      params: queries,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};