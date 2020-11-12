import React  from "react";
import { useBoard as context } from "../../contexts/BoardContext";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import { Column } from "../../components/column/Column";
import { BoardEl } from "./board.styles";
import { ItemObjectType, ColumnObjectType } from "../../types";

const Board = () => {
  const { state, dispatch } = context();

  const onDragEnd = (result: DropResult) => {
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
    <BoardEl>
      <DragDropContext onDragEnd={onDragEnd}>
        {state.columnsOrder.map((columnId: string) => {
          // Get id of the current column
          const column: ColumnObjectType = state.columns[columnId];

          // Get item belonging to the current column
          const items: ItemObjectType[] = column.itemsIds.map(
            (itemId: string) => state.items[itemId]
          );
          // Render the Column component
          return <Column key={column.id} column={column} items={items} />;
        })}
      </DragDropContext>
    </BoardEl>
  );
};

export default Board;
