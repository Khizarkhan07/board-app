import React, {useEffect, useMemo} from "react";
import { useBoard } from "../../contexts/BoardContext";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { Column } from "../../components/column/Column";
import { BoardEl } from "./board.styles";
import {ItemObjectType, ColumnObjectType} from "../../types";
import {getData, storeData} from "../../utils/util";
const Board = () => {
  let { state, dispatch } = useBoard();


  useEffect(()=> {
    if(getData() === false) {
      storeData(state)
    }
    else {
      const data = getData();
      dispatch( {type: 'CURRENT_STATE', payload: {data}})
    }
  }, [])

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      const newColumnOrder = Array.from(state.columnsOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      dispatch({ type: "COLUMN_DRAG", payload: { newColumnOrder } });

      return;
    }

    const columnStart = state.columns[source.droppableId];

    const columnFinish = state.columns[destination.droppableId];

    if (columnStart === columnFinish) {
      dispatch({
        type: "SAME_COLUMNS_DRAG",
        payload: {
          originalPosition: source.index,
          newPosition: destination.index,
          columnStart,
          draggableId,
        },
      });
      console.log(state);
    } else {
      dispatch({
        type: "DIFF_COLUMNS_DRAG",
        payload: {
          originalPosition: source.index,
          newPosition: destination.index,
          columnStart,
          draggableId,
          columnFinish,
        },
      });
    }

  };

  const renderColumns = useMemo(() => {
    return state.columnsOrder.map((columnId: string, index: number) => {
      const column: ColumnObjectType = state.columns[columnId];
      const items: ItemObjectType[] = column.itemsIds.map(
        (itemId: string) => state.items[itemId]
      );
      return (
        <Column key={column.id} column={column} items={items} index={index} />
      );
    });
  }, [state]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"col"} direction={"horizontal"} type={"column"} >
        {(provided, snapshot) => (
          <BoardEl {...provided.droppableProps} ref={provided.innerRef}>
            {renderColumns}
            {provided.placeholder}
          </BoardEl>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
