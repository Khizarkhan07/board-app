import React, { createContext, useContext, useReducer } from "react";
import { dragEndDifferentCol, dragEndSameCol } from "../utils/util";
import { InitialStateType } from "../types";

const SAME_COLUMNS_DRAG = "SAME_COLUMNS_DRAG";
const DIFF_COLUMNS_DRAG = "DIFF_COLUMNS_DRAG";
const ADD_ITEM = "ADD_ITEM";
const EDIT_ITEM = "EDIT_ITEM";
const ADD_CARD = "ADD_CARD";
const initialState = {
  items: {
    "1": { id: "1", content: "Learn TypeScript" },
    "2": { id: "2", content: "Build Basic Trello" },
    "3": { id: "3", content: "Use Strongly Type Components" },
  },

  columns: {
    "column-1": {
      id: "column-1",
      title: "ToDos",
      itemsIds: ["1", "2", "3"],
    },
    "column-2": {
      id: "column-2",
      title: "Under Development",
      itemsIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "QA",
      itemsIds: [],
    },
    "column-5": {
      id: "",
      title: "",
      itemsIds: [],
    },
  },
  columnsOrder: ["column-1", "column-2", "column-3", "column-5"],
};

const BoardContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const boardReducer = (state: InitialStateType, action: any) => {
  switch (action.type) {
    case SAME_COLUMNS_DRAG: {
      const {
        columnStart,
        originalPosition,
        newPosition,
        draggableId,
      } = action.payload;
      return dragEndSameCol(
        columnStart,
        originalPosition,
        newPosition,
        draggableId,
        state
      );
    }
    case DIFF_COLUMNS_DRAG: {
      const {
        columnStart,
        originalPosition,
        columnFinish,
        draggableId,
        newPosition,
      } = action.payload;

      return dragEndDifferentCol(
        columnStart,
        originalPosition,
        columnFinish,
        draggableId,
        newPosition,
        state
      );
    }
    case ADD_ITEM: {
      const column = (state.columns)[action.payload.column];

      column.itemsIds.push(action.payload.item.id);

      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.item.id]: action.payload.item,
        },
        columns: {
          ...state.columns,
          [action.payload.column]: column,
        },
      };
    }
    case EDIT_ITEM: {
      const { item } = action.payload;
      state.items[item.id].content = item.content;
      return state;
    }
    case ADD_CARD: {
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.column.id]: action.payload.column,
        },
        columnsOrder: [
          ...state.columnsOrder.slice(0, state.columnsOrder.length - 1),
          action.payload.column.id,
          ...state.columnsOrder.slice(state.columnsOrder.length - 1),
        ],
      };
    }
    default:
      return state;
  }
};

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};

export const Board = () => useContext(BoardContext);
export { BoardContext, AppProvider };
