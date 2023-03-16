import tw from 'tailwind-styled-components'
import { T_CommentReply } from '../../data/types/commentReply'

// ============== Types ===============================
// ============== Styled Components ===================
const Container=tw.div`pl-2 border-[1px] border-white`
// ============== Functions & Data ====================
// ============== Module ==============================
const CommentReply = ({reply}:{reply:T_CommentReply}) => {
    return (
        <Container>
            {reply.content}
        </Container>
    )
}
// ============== Sub Module #1 =======================
export default CommentReply