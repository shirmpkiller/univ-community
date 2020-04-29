import React, { useState } from 'react'
import {Input, Button} from 'antd'
import axios from 'axios';
import { useSelector } from 'react-redux'; 
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
const { TextArea } = Input;

function Comments(props) {
    const user = useSelector(state => state.user)
    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault(); //아무것도 안 쳤을 때 리프레쉬가 되지 않도록

        const variables = {
            content: Comment,
            writer: user.userData._id, //로컬스토리지에서 가져올 수ㄷ 있지만 리덕스 스토어에서 가져온 것
            postId: props.postId //prop을 이용한것 
        }

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("") //입력하고 난 다음 빈칸 만들기
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }
    return (
        <div>
             {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo && // 답글이면 / 리액트는 jsx문법 사용해서 div나 react.fragment로 감싸줘야 함
                    <React.Fragment> 
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}

            <form style={{ display: 'flex' }}  onSubmit={onSubmit}> 
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="write some comments"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button> 
            </form> 

        </div>
    )
}

export default Comments
