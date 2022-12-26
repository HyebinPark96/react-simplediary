import { useContext } from "react";
import DiaryItem from "./DiaryItem";

import { DiaryStateContext } from './App';

const DiaryList = (/*{ onRemove, diaryList, onEdit }*/) => {

    const diaryList = useContext(DiaryStateContext); // Provider의 value로 data 보내줬으므로, Props 대신 context 에서 가져오기

    // console.log(diaryList);
    
    return <div className="DiaryList">
        <h2>일기 리스트</h2>
        <h4>{diaryList.length}개의 일기가 있습니다.</h4>
        <div>
            {diaryList.map((item) => (
                <DiaryItem key={item.id} {...item} /* onRemove={onRemove} onEdit={onEdit} *//> 
            ))}
        </div>
    </div>
}

DiaryList.defaultProps={
    diaryList: [] // Props로 undefiend가 전달될 수 있으므로, 빈배열을 default값으로 설정
}

export default DiaryList;