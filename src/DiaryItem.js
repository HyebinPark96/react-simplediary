import React, { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({ 
    author, 
    content, 
    emotion, 
    created_date, 
    id, 
/*     onRemove, 
    onEdit  */
}) => {

    const {onRemove, onEdit} = useContext(DiaryDispatchContext);

/*     useEffect(() => {
        console.log(`${id}번 째 아이템 렌더!`);
    }) */

    const localContentInput = useRef();
    
    const handleRemove = () => {
        // console.log(id);
        if(window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
            onRemove(id);
        }
    }

    const [isEdit, setIsEdit] = useState(false); // 수정 중인지 아닌지 체크
    const toggleIsEdit = () => setIsEdit(!isEdit); // 값을 반전시키는 토글

    const [localContent, setLocalContent] = useState(content);

    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(content); // 내용 변경 후 수정 취소할 경우, 변경 전 값인 content로 초기화 
    }

    const handleEdit = () => {
        if(localContent.length < 5) {
            localContentInput.current.focus();
            return;
        }

        if(window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
            // console.log(id, localContent)
            onEdit(id, localContent);
            toggleIsEdit();
        }
    }

    return (

        <div className='DiaryItem'>
            <div className='info'>
                <span>작성자 : {author} | 감정점수 : {emotion}</span>
                <span className='date'>{new Date(created_date).toLocaleString()}</span>
            </div>
            <div className='content'>
                {isEdit 
                    ? 
                        <>
                            <textarea value={localContent} ref={localContentInput}
                                onChange={(e) => {
                                    setLocalContent(e.target.value);
                                }}
                            />
                        </> 
                    : 
                    <>
                        {content}
                    </>
                }
            </div>
            
            {isEdit 
            ? 
                <>
                    <button onClick={handleQuitEdit}>수정 취소</button>
                    <button onClick={handleEdit}>수정 완료</button>
                </> 
            :
                <> 
                    <button onClick={handleRemove}>삭제하기</button>
                    <button onClick={toggleIsEdit}>수정하기</button>
                </>
            }
        </div>
    )
}

export default React.memo(DiaryItem);