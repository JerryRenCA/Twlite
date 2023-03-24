import {default_fetch_meta, T_fetch_meta, URLBasic } from "../../data/types/dataConfig";

import {
  default_Comment,
  T_Comment,
  T_commentFetch,
  T_commentFetch_Data,
  T_commentNewDto,
} from "./commentDtos";

// transform T_Fetched to T_Topic for frontend
const transformCommentDto = (fetched: T_commentFetch_Data): T_Comment => {
  return {
    content: fetched.content,
    id: fetched.id,
    createdAt: new Date(Date.parse(fetched.createdAt)),
    updatedAt:new Date(Date.parse(fetched.updatedAt)),
    userId: fetched.userId,
    topicId: fetched.topicId,
    userName: fetched.userName,
    avatar: fetched.avatar,
  };
};

// get comments by TopicId
export const getComments = async ({
  topicId,
  bearer,
  pageSearchParams = default_fetch_meta,
}: {
  topicId: string;
  bearer: string;
  pageSearchParams?: T_fetch_meta;
}): Promise<T_Comment[]> => {
  const url_b = URLBasic + "/comments/ByTopic" + "/" + topicId + "?";
  const params = new URLSearchParams({
    page: pageSearchParams.page.toString(),
    take: pageSearchParams.take.toString(),
  });
  const url = `${url_b}${params.toString()}`;
  try {
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearer}`,
      },
    });
    const dataJson = await data.json() as T_commentFetch;
    console.log(dataJson);
    if (dataJson.data == null) return [];
    return dataJson.data.map(p=>transformCommentDto(p));
  } catch (err) {
    return [];
  }
  return [];
};

// post new comment
export const createComment = async ({
  commentNew,
  bearer,
}: {
  commentNew: T_commentNewDto;
  bearer: string;
}): Promise<T_Comment> => {
  console.log(bearer);
  const url = URLBasic + "/comments/new";
  try {
    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearer}`,
      },
      body: JSON.stringify(commentNew),
    });
    const dataJson = await data.json() as T_commentFetch_Data;
    return transformCommentDto(dataJson);
  } catch (err) {
    return default_Comment;
  }
};
