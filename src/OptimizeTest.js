import React, { useState, useEffect } from 'react';

// 최적화 방법 2. React.memo(props)
const Textview = React.memo(({text}) => { // props인 text가 변경되지 않는다면 리렌더링 안됨 
    useEffect(() => {
        console.log(`Update :: Text : ${text}`);
    })
    return <div>{text}</div>
});

const Countview = React.memo(({count}) => {
    useEffect(() => {
        console.log(`Update :: Count : ${count}`);
    })
    return <div>{count}</div>
});

const OptimizeTest = () => {

    const [count, setCount] = useState(1);
    const [text, setText] = useState("");

    return (
        <div style={{padding: 50}}>
            <div>
                <h2>count</h2>
                <Countview count={count} />
                <button onClick={() => {setCount(count + 1)}}>+</button>
            </div>
            <div>
                <h2>text</h2>
                <Textview text = {text}/>
                <input value={text} onChange={(e) => {setText(e.target.value)}} />
            </div>
        </div>
    )
}

export default OptimizeTest;