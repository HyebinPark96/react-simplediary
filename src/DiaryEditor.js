import React, { useEffect, useState, useRef, useContext } from 'react';
import { DiaryDispatchContext } from './App';

// 일기 데이터 수정, 삭제할 경우 App의 data state가 update
// => App 리렌더링
// => onCreate 재생성 
// => 어떠한 변화도 없는 DiaryEditor 리렌더링 될 수 밖에 없음
// 이처럼 불필요한 리렌더링 막기 위해 useCallback & React.memo 사용
const DiaryEditor = (/* { onCreate } */) => { 

    // 객체로 전달되었으므로 비구조화할당으로 받아오기
    const {onCreate} = useContext(DiaryDispatchContext) 
    
    // 최적화 테스트
    useEffect(() => {
        // onsole.log("DiaryEditor 렌더");
    })

    const authorInput = useRef();
    const contentInput = useRef();

    const [state, setState] = useState({
        author: "",
        content: "",
        emotion: 1,
    })

    // 같은 기능을 수행하는 state는 굳이 2개로 분리 안하고 위처럼 객체로 하나로 합칠 수 있다.
    // let [author, setAuthor] = useState("");
    // let [content, setContent] = useState(""); 

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

        // 폼 초기화
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
                // state 변경 첫번째 방법
                setState({
                    // 순서 주의
                    ...state, // Spread 문법 => 수정하지 않은 값은 기본값으로 설정
                    author: e.target.value,
                }); 
            }}/>
        </div>
        <div>
            {/* state 변경 두번째 방법 */}
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

// React.memo() : Props가 변경되지 않았다면 메모이징 된 내용을 그대로 사용한다.
export default React.memo(DiaryEditor); // 새로 메모이징된 컴포넌트 export