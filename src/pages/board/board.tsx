import React from "react";
import { Board as context } from "../../contexts/BoardContext";
import { DragDropContext } from "react-beautiful-dnd";
import { BoardColumn } from "../../components/BoardColumn";
import {BoardEl} from "./board.styles";
import { ItemObjectType, ColumnObjectType } from "../../types";

const Board = () => {
  const { state, dispatch } = context();

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
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

  return (
    <>
      <BoardEl>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.columnsOrder.map((columnId) => {
            // Get id of the current column
            const column: ColumnObjectType = state.columns[columnId];

            // Get item belonging to the current column
            const items: ItemObjectType[] = column.itemsIds.map(
              (itemId) => state.items[itemId]
            );
            // Render the BoardColumn component
            return (
              <BoardColumn key={column.id} column={column} items={items} />
            );
          })}
        </DragDropContext>
      </BoardEl>
    </>
  );
};

export default Board;