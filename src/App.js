import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { useState, useRef } from 'react';
import Lifecycle from './Lifecycle';
import Lifecycle2 from './Lifecycle2';

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author, 
      content, 
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  }

  const onRemove = (targetId) => {
    // console.log(targetId + '가 삭제되었습니다.');
    // 전달받은 id를 제외한 리스트로 다시 set
    const newDiaryList = data.filter((item) => item.id !== targetId);
    setData(newDiaryList);
  }

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((item) => 
        item.id === targetId ? {...item, content: newContent} : item
      )
    );
  };

  return ( 
    <div className="App">
      <Lifecycle />
      <Lifecycle2 />
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}/>
    </div>
  );
}

export default App;
