import DiaryItem from "./DiaryItem";

const DiaryList = ({ onRemove, diaryList, onEdit }) => {
    
    // console.log(diaryList);
    
    return <div className="DiaryList">
        <h2>일기 리스트</h2>
        <h4>{diaryList.length}개의 일기가 있습니다.</h4>
        <div>
            {diaryList.map((item) => ( // 2번째 인자는 인덱스 => key로 사용가능 (데이터 수정, 삭제 시 변경될 위험 있으므로 지양)
                <DiaryItem onEdit={onEdit} key={item.id} {...item} onRemove={onRemove}/> /* Spread 문법으로 리스트 아이템 전달 (key value 그대로 사용)*/
            ))}
        </div>
    </div>
}

DiaryList.defaultProps={
    diaryList:[] // undefiend가 props로 전달될 경우를 대비해 default 값으로 빈배열 설정
}

export default DiaryList;