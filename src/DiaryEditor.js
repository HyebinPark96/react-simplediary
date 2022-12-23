import React, { useEffect, useState, useRef } from 'react';

// App으로부터 props로 받은 onCreate 때문에 DiaryEditor는 변경사항 없는데도 App 때문에 리렌더링 됨
const DiaryEditor = ({ onCreate }) => { 

    useEffect(() => {
        console.log("DiaryEditor 렌더");
    })

    const authorInput = useRef();
    const contentInput = useRef();

    // 첫번째 방법
    const [state, setState] = useState({
        author: "",
        content: "",
        emotion: 1,
    })

    // 같은 기능을 수행하는 state는 굳이 2개로 분리 안하고 위처럼 객체로 하나로 합칠 수 있다.
    // let [author, setAuthor] = useState("");
    // let [content, setContent] = useState(""); 

    // 두번째 방법
    const handleChangeState = (e) => {
        // console.log(e.target.name); // key
        // console.log(e.target.value); // value
        
        setState({
            ...state, 
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = () => {
        if(state.author.length < 1) {
            authorInput.current.focus();
            return; 
        }
        if(state.content.length < 5) {
            contentInput.current.focus();
            return; 
        }
        
        onCreate(state.author, state.content, state.emotion);
        
        // console.log(state);

        setState({
            author: "",
            content: "",
            emotion: 1
        })
        
        alert('저장 성공');
    }



    return <div className='DiaryEditor'>
        <h2>오늘의 일기</h2>
        <div>
            <input name='author' value={state.author} ref={authorInput} onChange={(e) => {
                setState({
                    // 순서 주의
                    ...state, // Spread 문법으로 인해 변경되지 않는 값은 기본값으로 설정됨
                    author: e.target.value,
                }); // set함수를 사용하지 않으면 author는 절대 변할 수 없고, value값 입력해도 아무런 변화가 없다.
            }}/>
        </div>
        <div>
            <textarea name='content' value={state.content} ref={contentInput} onChange={handleChangeState}/>
        </div>
        <div>
            오늘의 감정점수 :&nbsp;
            <select name='emotion' value={state.emotion} onChange={handleChangeState}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
        </div>
        <div>
            <button onClick={handleSubmit}>일기 저장하기</button>
        </div>
    </div>
};

export default React.memo(DiaryEditor);