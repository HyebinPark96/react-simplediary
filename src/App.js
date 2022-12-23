import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
/* import OptimizeTest from './OptimizeTest';
import OptimizeTest2 from './OptimizeTest2';
import OptimizeTest3 from './OptimizeTest3'; */

// api https://jsonplaceholder.typicode.com/comments

const App = () => {
  // 총 2번의 렌더링 거침 
  // 1. 처음 렌더링될 때 data 빈값일 때
  // 2, api 호출로 data 값 설정될 때 
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  // API 호출
  const getData = async() => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments' 
    ).then((res) => res.json());

    // console.log(res);
    const initData = res.slice(0, 20).map((item) => {
      // 새로운 배열 반환
      return {
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++
      }
    })

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, [])

  // useMemo 사용 금지
  // 함수 자체를 props로 전달해야 하는데, useMemo은 값을 반환하기 때문
  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author, 
      content, 
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    // setData([newItem, ...data]); // useCallback은 최초 렌더링 시 한 번만 호출되므로, 추가된 data list를 받지 못한다.
    setData((data) => [newItem, ...data]); // 함수형 Update (상태변화함수인 set함수에 함수를 전달)
    // 함수를 재생성하면서 항상 최신의 state를 참조할 수 있도록 함.
  }, []);

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

  // 최적화 방법 1. useMemo
  // useMemo : 재연산하지 않고 기억해둠 (특정 값이 바뀔 때마다 리렌더링되어 비효율적일 때 사용하여, 
  // 연산에 영향을 끼치지 않는다면 = 재연산할 필요가 없다면 useMemo 사용)
  const getDiaryAnalysis = useMemo( // useMemo : 첫번째 인자로 콜백함수의 리턴값을 받아 연산 최적화
    () => {
      // console.log('일기 분석 시작');
      
      const goodCount = data.filter((item) => item.emotion >= 3).length;
      const badCount = data.length - goodCount;
      const goodRatio = (goodCount / data.length) * 100;

      return { goodCount, badCount, goodRatio }; // 객체로 리턴
    }, [data.length] // useState의 dependency Array과 동일하며, data.length가 변하지 않는다면 똑같은 리턴값을 다시 연산하지 않고 기억해둔다.
  );

  // 비구조화할당
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; // getDiaryAnalysis() 에러 // useMemo : 콜백함수의 리턴값을 리턴하므로 함수 형태에서 값으로 변경해야 함

  return ( 
    <div className="App">
{/*       <OptimizeTest />
      <OptimizeTest2 />
      <OptimizeTest3 /> */}
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}/>
    </div>
  );
}

export default App;
