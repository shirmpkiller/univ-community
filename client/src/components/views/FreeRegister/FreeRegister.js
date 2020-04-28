import React, { useState } from 'react'
import { Button, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux'; //리덕스 훅에서 sueselector를 이용

const { TextArea } = Input;
function FreeRegister(props) {
    const user = useSelector(state => state.user);
    const [freetitle, setfreetitle] = useState("")
    const [freecontent, setfreecontent] = useState("")

    const freeTitleChange = (e) => {
        setfreetitle(e.currentTarget.value)
    }

    const freeContentChange = (e) => {
        setfreecontent(e.currentTarget.value)
    }
    const onSubmit = (e) => {
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
    }

    return (
        <div>
             <form style={{ display: 'flex' }} onSubmit={onSubmit}> 
             <Input
                value={freetitle}
                onChange={freeTitleChange}
                 placeholder="제목을 입력하세요..." 
             />
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={freeContentChange}
                    value={freecontent}
                    placeholder="본문을 입력하세요..."
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button> 
            </form> 
        </div>
    )
}

export default FreeRegister
