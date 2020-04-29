import React, { useState, useEffect } from 'react'
import {Card, Typography,Row, Col, Input,Descriptions } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux'; //리덕스 훅에서 sueselector를 이용
import Comments from './Sections/Comments'
const { Title } = Typography;
const { TextArea } = Input;
function FreeDetail(props) {
    const postId = props.match.params.postId //모르겠음
   // const user = useSelector(state => state.user);
    const [Post, setPost] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    //const [freecontent, setfreecontent] = useState("")

    /*const freeTitleChange = (e) => {
        setfreetitle(e.currentTarget.value)
    }

    const freeContentChange = (e) => {
        setfreecontent(e.currentTarget.value)
    }*/
    const postVariable = {
       postId: postId
    }


    useEffect(() => {
        axios.post('/api/boardregister/getpost', postVariable)
            .then(response => {
                if (response.data.success) {
                    setPost(response.data.post)
                }else {
                    alert('글을 가져오는데 실패했습니다')
                }
            })
        
            axios.post('/api/comment/getComments', postVariable) //해당 video에 대한 comment들을 가져옴
            .then(response => {
                if (response.data.success) {
                    console.log('response.data.comments',response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get video Info')
                }
            })

    }, [])

   /* const onSubmit = (e) => {
        e.preventDefault(); //아무것도 안 쳤을 때 리프레쉬가 되지 않도록

        const variables = {
           writer: user.userData._id,
           freetitle : freetitle,
           freecontent : freecontent
        }

        axios.post('/api/boardregister/freeregister', variables)
            .then(response => {
                if (response.data.success) {
                    setfreetitle("") //입력하고 난 다음 빈칸 만들기
                    setfreecontent("") 
                    props.history.push('/freeboard')
                   // props.refreshFunction(response.data.result)
                } else {
                    alert('생성 실패')
                }
            })
    }*/
    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

const typotitle= <Title level={2}>{Post.freetitle}</Title>

    if(Post.freetitle)
    {
        return (
            <React.Fragment>
                <div style={{paddingTop:'25px'}}>
                    <Row>
                        <Col span={15} offset={3}>
                                <Card title={typotitle} /*bordered={false} style={{ width: 300 }}*/>
                                    <p>{Post.freecontent}</p>
                                </Card>
                                <br />
                                <p> replies</p>
                                <hr />
                        </Col>
                    </Row>
                    
                </div>

                   

                <div style={{paddingTop:'25px'}}>
                    <Row>
                        <Col span={15} offset={3}>
                             <Comments  CommentLists={CommentLists} postId={postId} refreshFunction={updateComment}/>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
          
        )
    }else {
        return (
            <div>Loading...</div>
        )
    }
 
}

export default FreeDetail
