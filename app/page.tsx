"use client";
import type { RootState } from "@reduxjs/toolkit/query";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "@/store/slices/counterSlice";
import { Button } from "@/components/ui/button"
import toast from 'react-hot-toast';
    
export default function Home() {
    const count = useSelector((state: RootState) => state.counter.value);
    // FIX: RootState not error showing need to address it
    const dispatch = useDispatch();
     // TODO: Create PopUp models functions
    const notify = () => toast('Here is your toast.');
    return (
        <div>
            <h1>Hello, Hirenixs</h1>
            <div className="bg-red-500">Hello world</div>
                        <button onClick={notify}>Make me a toast</button>
            <div>
                <div>
                    <button
                        aria-label="Increment value"
                        onClick={() => dispatch(increment())}
                    >
                        Increment
                    </button>
                    <span>{count}</span>
                    <button
                        aria-label="Decrement value"
                        onClick={() => dispatch(decrement())}
                    >
                        Decrement
                    </button>
                </div>
            </div>
        </div>
    );
}
