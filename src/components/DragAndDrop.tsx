import { DragEvent, useCallback, useMemo } from "react";
import { ContainerProps } from "../types";
import { useSelector, useDispatch } from "react-redux";
import { RootState, setFiles } from "../reducers";

type DragAndDropEvent = DragEvent<HTMLDivElement>;

export function DragAndDrop({ children, style }: ContainerProps) {
  const dispatch = useDispatch();
  const enabled = useSelector((state: RootState) => state.dragAndDrop.enabled);

  const preventDefaultAndStopPrograpagation = useCallback(
    (e: DragAndDropEvent) => {
      e.preventDefault();
      e.stopPropagation();
    },
    []
  );

  const handleDrop = useCallback(
    (e: DragAndDropEvent) => {
      preventDefaultAndStopPrograpagation(e);
      const file = e.dataTransfer.files[0];
      if (file) dispatch(setFiles([file]));
      else dispatch(setFiles([]));
    },
    [preventDefaultAndStopPrograpagation, dispatch]
  );

  const handleDragOver = useCallback(
    (e: DragAndDropEvent) => {
      preventDefaultAndStopPrograpagation(e);
    },
    [preventDefaultAndStopPrograpagation]
  );

  const handleDragEnter = useCallback(
    (e: DragAndDropEvent) => {
      preventDefaultAndStopPrograpagation(e);
    },
    [preventDefaultAndStopPrograpagation]
  );

  const handleDragLeave = useCallback(
    (e: DragAndDropEvent) => {
      preventDefaultAndStopPrograpagation(e);
    },
    [preventDefaultAndStopPrograpagation]
  );

  const combinedStyle = useMemo(() => {
    return {
      ...{ width: "100%", height: "100%", border: "red 5px solid" },
      ...style,
    };
  }, [style]);

  return (
    <div
      style={combinedStyle}
      onDrop={enabled ? handleDrop : undefined}
      onDragOver={enabled ? handleDragOver : undefined}
      onDragEnter={enabled ? handleDragEnter : undefined}
      onDragLeave={enabled ? handleDragLeave : undefined}
    >
      {children}
    </div>
  );
}
