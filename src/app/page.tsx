"use client";
import ThemeSwitch from "@/components/theme-switcher";
import type { RootState } from "@reduxjs/toolkit/query";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "@/store/slices/counterSlice";
    
export default function Home() {
    const count = useSelector((state: RootState) => state.counter.value);
    // FIX: RootState not error showing need to address it
    const dispatch = useDispatch();
     // TODO: Create PopUp models functions
    return (
        <div>
            <h1>Hello, Hirenixs</h1>
            <ThemeSwitch />
            <div className="">Hello world</div>
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
