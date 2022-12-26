import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import React, { useRef, useEffect, useMemo, useCallback, useReducer } from 'react';
/* import OptimizeTest from './OptimizeTest';
import OptimizeTest2 from './OptimizeTest2';
import OptimizeTest3 from './OptimizeTest3'; */

// 첫번째 인자 : 상태 변화 직전 state
// 두번째 인자 : 어떤 상태 변화를 일으켜야 하는지에 대한 정보가 담긴 객체
const reducer = (state, action) => { 
  // switch-case문 (type별) 
  switch(action.type) {
    case 'INIT': {
      return action.data; // 리턴값이 새로운 state가 됨
    }

    case 'CREATE': {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date
      }
      return [newItem, ...state]
    }

    case 'REMOVE': {
      // 전달받은 id(targetId)를 제외한 리스트 리턴
      return state.filter((item) => item.id !== action.targetId);
    }

    case 'EDIT': {
      return state.map((item) => item.id === action.targetId ? {...item, content: action.newContent} : item); 
    }

    default:
      return state; 
  }
};
// Props Drilling 막기 위해 Context(문맥) 사용 
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const App = () => {  
  // useReducer 사용이유
  // 복잡한 상태(setData) 변화 로직 을 컴포넌트 밖으로 꺼내기 위함 
  const [data, dispatch] = useReducer(reducer, []); // dispatch : state update를 발생하게 함, reducer : state를 update하는 함수
  // const [data, setData] = useState([]); 

  const dataId = useRef(0);

  // API 호출
  const getData = async() => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments' 
    ).then((res) => res.json());

    // console.log(res);
    const initData = res.slice(0, 20).map((item) => {
      return {
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++
      }
    })

    dispatch({type:'INIT', data: initData});
    // setData(initData);
  };

  useEffect(() => {
    getData();
  }, [])

  // 최적화 기법 3. useCallback 
  // Props로 '함수'를 전달해야 한다면 '값'을 반환하는 useMemo 사용 불가
  // useCallback으로 특정 함수를 새로 만들지 않고 재사용
  const onCreate = useCallback((author, content, emotion) => {

    dispatch({type: 'CREATE', data: {author, content, emotion, id: dataId.current}});

    dataId.current += 1;
    // setData([newItem, ...data]); // useCallback은 최초 렌더링 시 한 번만 호출되므로, 추가된 data list를 받지 못해 아래방식 사용
    // setData((data) => [newItem, ...data]); // 함수형 Update (상태변화함수인 set함수에 함수를 전달)
    
    // 함수를 재생성하면서 항상 최신의 state를 참조할 수 있도록 함.
  }, []);

  const onRemove = useCallback((targetId) => {
    // console.log(targetId + '가 삭제되었습니다.');
    dispatch({type:'REMOVE', targetId});
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({type: 'EDIT', targetId, newContent})
  }, []);

  const memoizedDispatches = useMemo(() => { // 재생성되지 않게 useMemo 사용
    return {onCreate, onRemove, onEdit}
  }, [])

  // 최적화 방법 1. useMemo : 첫번째 인자인 콜백함수의 리턴값을 반환 
  const getDiaryAnalysis = useMemo(
    () => {
      // console.log('일기 분석 시작');
      
      const goodCount = data.filter((item) => item.emotion >= 3).length;
      const badCount = data.length - goodCount;
      const goodRatio = (goodCount / data.length) * 100;

      return { goodCount, badCount, goodRatio }; 
    }, [data.length] // data.length 변하지 않았다면 재연산하지 않고 메모이징 된 값을 반환
  );

  // 비구조화할당 
  // const { goodCount, badCount, goodRatio } = getDiaryAnalysis(); // useMemo는 값을 리턴하므로 함수 형태에서 값으로 변경해야 함
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  // Props Drilling : Props를 하위 컴포넌트에게 전달하기 위해 해당 데이터가 필요없는 컴포넌트에게도 전달해야 하는 구조
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
    {/*       <OptimizeTest />
          <OptimizeTest2 />
          <OptimizeTest3 /> */}
          <DiaryEditor /* onCreate={onCreate}  *//>
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div>
          <DiaryList /* onEdit={onEdit} onRemove={onRemove} diaryList={data} *//> 
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
