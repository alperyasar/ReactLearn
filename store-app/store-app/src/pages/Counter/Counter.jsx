// src/pages/Counter/Counter.jsx
import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, incrementByValue } from "./CounterSlice";

export default function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value); // <-- value

  return (
    <>
      <Typography>{count}</Typography>
      <ButtonGroup>
        <Button variant="contained" onClick={() => dispatch(increment())}>
          Increment
        </Button>
        <Button variant="contained" onClick={() => dispatch(decrement())}>
          Decrement
        </Button>
        <Button
          variant="contained"
          onClick={() => dispatch(incrementByValue(10))}
        >
          Increment By Value
        </Button>
      </ButtonGroup>
    </>
  );
}
