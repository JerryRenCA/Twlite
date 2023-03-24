import { useContext } from "react";
import { authContext } from "../../contexts/authContext/AuthProvider";
import { default_fetch_meta, T_fetch_meta, URLBasic } from "../../data/types/dataConfig";
import {
  default_Topic,
  T_Topic,
  T_topicFetch,
  T_topicFetch_Data,
  T_topicNewDto,
} from "./topicDtos";

// transform T_Fetched to T_Topic for frontend
const transformTopicDto = (fetched: T_topicFetch_Data): T_Topic => {
  return {
    title: fetched.title,
    content: fetched.content,
    id: fetched.id,
    createdAt: new Date(Date.parse(fetched.createdAt)),
    updatedAt: fetched.updatedAt,
    userId: fetched.userId,
    userName: fetched.userName,
    avatar: fetched.avatar,
  };
};

// get topics
export const getTopics = async ({
  bearer,
  pageSearchParams=default_fetch_meta
}: {
  bearer: string;
  pageSearchParams?:T_fetch_meta
}): Promise<{data:T_Topic[],meta:T_fetch_meta}> => {
  const url_b = URLBasic + "/topics";
  const params = new URLSearchParams({
    page: pageSearchParams.page.toString(),
    take: pageSearchParams.take.toString(),
  });
  const url = `${url_b}?${params.toString()}`;
  try {
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearer}`,
      },
    });
    const dataJson = (await data.json()) as T_topicFetch;
    console.log(dataJson);
    if (dataJson.data == null) return {data:[],meta:default_fetch_meta};
    return {data:dataJson.data.map((p) => transformTopicDto(p)),meta:dataJson.meta};
  } catch (err) {
    return  {data:[],meta:default_fetch_meta};
  }
  return  {data:[],meta:default_fetch_meta};
};

// post new topic
export const createTopic = async ({
  topicNew,
  bearer,
}: {
  topicNew: T_topicNewDto;
  bearer: string;
}): Promise<T_Topic> => {
  const url = URLBasic + "/topics/new";
  try {
    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearer}`,
      },
      body: JSON.stringify(topicNew),
    });
    const dataJson = (await data.json()) as T_topicFetch_Data;
    console.log(dataJson);
    return transformTopicDto(dataJson);
  } catch (err) {
    return default_Topic;
  }
};
