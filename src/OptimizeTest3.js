import React, { useEffect, useState } from "react";

const CounterA = React.memo(( {count} ) => {

    useEffect(() => {
        console.log(`CounterA Update - count: ${count}`)
    })

    return <div>{count}</div>
});

const CounterB = ( {obj} ) => {

    useEffect(() => {
        console.log(`CounterB Update - count: ${obj.count}`)
    })

   return <div>{obj.count}</div>
};

const areEquals = ((prevProps, nextProps) => {
    return prevProps.obj.count === nextProps.obj.count;
})

const MemoizedCounterB = React.memo(CounterB, areEquals); // React.memo : 두번째 인자 값이 true라면 리렌더링 X

const OptimizeTest3 = () => {

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
                <MemoizedCounterB obj={obj} /> {/* CounterB => 고차 컴포넌트 MemoizedCounterB로 변경 */}
                <button onClick={() => setObj({
                    count: obj.count
                })}>B Button</button>
            </div>
        </div>
    )
}

export default OptimizeTest3;
