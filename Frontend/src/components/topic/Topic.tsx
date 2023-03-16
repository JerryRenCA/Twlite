import { useState } from 'react'
import tw from 'tailwind-styled-components'
import { T_Topic } from '../../data/types/topic'
import { T_TopicComment } from '../../data/types/topicComment'
import TopicComment from '../comment/TopicComment'

// ============== Types ===============================
// ============== Styled Components ===================
const Container=tw.div`border-x-[1px] border-dashed`
const Title=tw.div`border-t-[1px] min-h-[3rem] p-4`
const Content=tw.div` min-h-[6rem] px-4`
const CommentContainer=tw.div``

// ============== Functions & Data ====================
// ============== Module ==============================
const Topic = ({topic}:{topic:T_Topic}) => {
    const [comments,setComments]=useState<T_TopicComment[]>([])

    return (
        <Container>
            <Title>
                {topic.title}
            </Title>
            <Content>
                {topic.content}
            </Content>
            <ButtonBar/>
            <CommentContainer>
                {comments.map(comment=>(<TopicComment comment={comment}/>))}
            </CommentContainer>
        </Container>
    )
}
// ============== Sub Module #1 =======================
const ButtonBar=()=>{
    return(<></>)
}
export default Topic