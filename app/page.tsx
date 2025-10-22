"use client";
import type { RootState } from "@reduxjs/toolkit/query";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "@/store/slices/counterSlice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  // FIX: RootState not error showing need to address it
  const dispatch = useDispatch();
  // TODO: Create PopUp models functions
  return (
    <div>
      <h1>Hello, Hirenixs</h1>
      <div>
        <div>
          <Button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </Button>
          <span>{count}</span>
          <Button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() => toast("Event has been created")}
        >
          Default
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.success("Event has been created")}
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.info("Be at the area 10 minutes before the event time")
          }
        >
          Info
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.warning("Event start time cannot be earlier than 8am")
          }
        >
          Warning
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.error("Event has not been created")}
        >
          Error
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast.promise<{ name: string }>(
              () =>
                new Promise((resolve) =>
                  setTimeout(() => resolve({ name: "Event" }), 2000),
                ),
              {
                loading: "Loading...",
                success: (data) => `${data.name} has been created`,
                error: "Error",
              },
            );
          }}
        >
          Promise
        </Button>
      </div>
    </div>
  );
}
