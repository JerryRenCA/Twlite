import { URLBasic } from "../../data/types/dataConfig";
import { default_Comment, T_Comment } from "../../data/types/comment";
import { T_commentNewDto } from "./commentDtos";

// get comments by TopicId
export const getComments=async ({topicId,bearer}:{topicId:string,bearer:string}):Promise<T_Comment[]>=>{
  const url_b=URLBasic+"/comments/ByTopic"+"/"+topicId+"?";
  const params = new URLSearchParams({
    page: '1',
    take: '5',
  });
  const url = `${url_b}${params.toString()}`;
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
      if(dataJson.data==null)return[]
      return dataJson.data;
    } catch (err) {
      return [];
    }
  return []
}

// post new comment
export const createComment=async({commentNew,bearer}:{commentNew:T_commentNewDto,bearer:string}):Promise<T_Comment>=>{
    console.log(bearer)
     const url=URLBasic+"/comments/new"
     try {
         const data= await fetch(url,{
           method:"POST",
           headers:{
               "Content-Type":"application/json",
               'Authorization': `Bearer ${bearer}`
           },
           body:JSON.stringify(commentNew)
         })
         const dataJson=await data.json();
         console.log(dataJson)
         return dataJson;
       } catch (err) {
         return default_Comment;
       }
 }