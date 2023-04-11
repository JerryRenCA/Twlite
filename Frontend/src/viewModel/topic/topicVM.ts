import { useContext } from "react";
import { authContext } from "../../contexts/authContext/AuthProvider";
import { default_fetch_meta, TopTopicId, T_fetch_meta, URLBasic } from "../../data/types/dataConfig";
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
    contentType:fetched.contentType,
    parentId:fetched.parentId,
    picFile:fetched.picFile,
  };
};

// get topics
export const getTopics = async ({
  bearer,
  topicId=TopTopicId,
  pageSearchParams=default_fetch_meta
}: {
  bearer: string;
  topicId?:string,
  pageSearchParams?:T_fetch_meta
}): Promise<{data:T_Topic[],meta:T_fetch_meta}> => {
  const url_b = URLBasic + "/topics" + "/" + topicId;
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
  file,
  bearer,
}: {
  topicNew: T_topicNewDto;
  file?:File,
  bearer: string;
}): Promise<T_Topic> => {
  console.log("topicNew::",topicNew)
  const url = URLBasic + "/topics/new";
  const formData=new FormData();
  if(file)
    formData.append('picfile',file);
  formData.append("content",topicNew.content)
  formData.append("contentType",topicNew.contentType)
  formData.append("parentId",topicNew.parentId)
  formData.append("picFile",topicNew.picFile)
  formData.append("title",topicNew.title)
  try {
    const data = await fetch(url, {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${bearer}`,
      },
      body: formData,
    });
    const dataJson = (await data.json()) as T_topicFetch_Data;
    console.log(dataJson);
    return transformTopicDto(dataJson);
  } catch (err) {
    return default_Topic;
  }
};
