import React,{useEffect, useState} from 'react'
import { Row, Col,Button, Card  } from 'antd';
import axios from 'axios';

function FreeBoard() {

    const [Posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('/api/boardregister/getposts')
            .then(response => {
                if (response.data.success) {
                   // console.log(response.data.videos)
                    setPosts(response.data.posts)
                } else {
                    alert('글을 가져오는데 실패했습니다')
                }
            })
        

    }, [])

    const postItem = Posts.map(( post, index) => { //map으로 모든 video 정보를 불러온다

       return <div key={index} /*map에선 key에 index를 넣어줘야 에러 안남 */ style={{ margin: '25px' }}>
         <div >
            <Row>
                <Col span={16} offset={4}>
                <a href={`/post/${post._id}`}>
                    <Card title={post.freetitle} extra={<a href="#">More</a>} /*style={{background: '#ececec'}}*/ /*bordered={false}*/>
                       {post.freecontent}
                    </Card>
                    </a>
                </Col>
            </Row>
        </div>
    </div>
    })
    
    return (
        <React.Fragment>
        <div style={{ margin: '25px' }}>
            <Row>
                <Col span={2} offset={4}>
                  <Button href='/freeregister' type="primary" size='large'>글 생성 </Button>
                </Col>
            </Row>
        </div>
        {postItem}
        </React.Fragment>
    )
}

export default FreeBoard
