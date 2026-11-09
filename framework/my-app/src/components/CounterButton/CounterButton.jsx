import { useState } from "react";

export const CounterButton = () =>{
    const [count, setCount] = useState(0)
    return <div>        
            <button
                type="button"
                className="counter"
                onClick={() => setCount((count) => count + 1)}
                >
                Count is {count}
            </button>
        </div>
}