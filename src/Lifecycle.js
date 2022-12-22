import React, { useEffect, useState } from "react";

const Lifecycle = () => {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");
    
    // 제어 1.
    useEffect(() => {
        // Mount 된 시점에 콜백함수
        console.log('Mount!');
    }, []); 

    // 제어 2.
    useEffect(() => {
        // 컴포넌트 업데이트 된 시점
        console.log('Update!');
    }); 

    // 제어 3.
    useEffect(() => {
        console.log(`count is update : ${count}`);
        if(count > 5) {
            alert('count가 5를 넘었습니다. 따라서 1로 초기화합니다.');
            setCount(1);
        }
    }, [count]); // Dependency Array

    useEffect(() => {
        console.log(`text is update : ${text}`);
    }, [text]); // Dependency Array

    return <div style={{ padding: 20}}>
        <div>
            {count}
            <button onClick={() => setCount(count+1)}>+</button>
        </div>
        <div>
            <input value={text} onChange={(e) => {
                setText(e.target.value);
            }}></input>
        </div>
    </div>
}

export default Lifecycle;