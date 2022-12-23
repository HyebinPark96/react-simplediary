// 최적화 방법 중 React.memo 예제
// 둘 다 같은 값으로 set하지만, 객체인 obj 변경 시에만 리렌더링 되고, count 변경 시에는 아무런 변화가 없다.
// 그 이유는 객체는 얕은 비교를 하기 때문이다. 즉, 값으로 비교하지 않고, 주소값으로 비교한다는 것이다. 
import React, { useEffect, useState } from "react";

const CounterA = React.memo(( {count} ) => {

    useEffect(() => {
        console.log(`CounterA Update - count: ${count}`)
    })

    return <div>{count}</div>
});

const CounterB = React.memo(( {obj} ) => {

    useEffect(() => {
        console.log(`CounterB Update - count: ${obj.count}`)
    })

   return <div>{obj.count}</div>
});

const OptimizeTest2 = () => {

    const [count, setCount] = useState(1);
    const [obj, setObj] = useState({
        count: 1
    })

    return (
        <div style={{ padding: 50 }}>
            <div>
                <h2>Counter A</h2>
                <CounterA count={count} />
                <button onClick={() => setCount(count)}>A button</button>
            </div>
            <div>
                <h2>Counter B</h2>
                <CounterB obj={obj} />
                <button onClick={() => setObj({
                    count: obj.count
                })}>B Button</button>
            </div>
        </div>
    )
}

export default OptimizeTest2;
