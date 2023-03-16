import { useContext } from "react"
import { authContext } from "../../contexts/authContext/AuthProvider"
import { URLBasic } from "../../data/types/dataConfig"
import { default_Topic, T_Topic } from "../../data/types/topic"
import { T_topicNewDto } from "./topicDtos"

// get topics
export const getTopics=async ({bearer}:{bearer:string}):Promise<T_Topic[]>=>{
    const url=URLBasic+"/topics"
    try {
        const data= await fetch(url,{
          method:"GET",
          headers:{
              "Content-Type":"application/json",
              'Authorization': `Bearer ${bearer}`,
          },
        })
        const dataJson=await data.json();
        console.log(dataJson)
        return dataJson.data;
      } catch (err) {
        return [];
      }
    return []
}

// post new topic
export const createTopic=async({topicNew,bearer}:{topicNew:T_topicNewDto,bearer:string}):Promise<T_Topic>=>{
   console.log(bearer)
    const url=URLBasic+"/topics/new"
    try {
        const data= await fetch(url,{
          method:"POST",
          headers:{
              "Content-Type":"application/json",
              'Authorization': `Bearer ${bearer}`
          },
          body:JSON.stringify(topicNew)
        })
        const dataJson=await data.json();
        console.log(dataJson)
        return dataJson;
      } catch (err) {
        return default_Topic;
      }
}