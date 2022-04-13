import { useEffect, RefObject } from "react";
import { useDispatch } from "react-redux";
import { appendToDiv, removeFromDiv } from "../reducers";

export function useAppendToDiv(sceneContainer: RefObject<HTMLDivElement>) {
  const dispatch = useDispatch();
  useEffect(() => {
    const div = sceneContainer.current;
    if (!div) return;
    dispatch(appendToDiv(div));
    return () => {
      dispatch(removeFromDiv(div));
    };
  }, [sceneContainer, dispatch]);
}
