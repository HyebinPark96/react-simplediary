import React, { useEffect, useState } from "react";

const UnmountTest = () => {

    useEffect(() => {
        // console.log('Mount!')
        
        return () => {
            // UnMount 시점에 실행되게 됨
            console.log('Unmount!');
        }
    }, [])

    return <div>Unmout Testing Component</div>
}

const Lifecycle = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggle = () => {
        setIsVisible(!isVisible);
    }

    return (
        <div style={{ padding: 20}}>
            <button onClick={toggle}>ON/OFF</button>
            {/* 단락회로평가 */}
            {isVisible && <UnmountTest />}
        </div>
    );
}

export default Lifecycle;