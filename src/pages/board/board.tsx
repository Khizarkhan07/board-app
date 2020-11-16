import React from "react";
import { useBoard } from "../../contexts/BoardContext";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { Column } from "../../components/column/Column";
import { BoardEl } from "./board.styles";
import { ItemObjectType, ColumnObjectType } from "../../types";
const Board = () => {
  const { state, dispatch } = useBoard();


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

    if(type === 'column') {

      if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
      ) {
        return;
      }

      const newColumnOrder = Array.from(state.columnsOrder);
      newColumnOrder.splice(source.index,1);
      newColumnOrder.splice(destination.index, 0, draggableId)

      dispatch({type: 'COLUMN_DRAG', payload: {newColumnOrder}})
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

  const renderColumns =
     state.columnsOrder.map((columnId: string, index: number) => {
      // Get id of the current column
      const column: ColumnObjectType = state.columns[columnId];

      // Get item belonging to the current column
      const items: ItemObjectType[] = column.itemsIds.map(
          (itemId: string) => state.items[itemId]
      );
      // Render the Column component
      return <Column key={column.id} column={column} items={items} index={index} />;
    });


  return (

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={'abc'} direction={'horizontal'} type={"column"}>
          {(provided, snapshot) => (

              <BoardEl
                  {...provided.droppableProps}
                  ref={provided.innerRef}
              >
                {renderColumns}
                {provided.placeholder}
              </BoardEl>
          )}
        </Droppable>
      </DragDropContext>

  );
};

export default Board;
