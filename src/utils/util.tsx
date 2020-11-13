import { ColumnObjectType, ColumnType, InitialStateType } from "../types";
export const dragEndDifferentCol = (
  columnStart: ColumnObjectType,
  originalPosition: number,
  columnFinish: ColumnObjectType,
  draggableId: string,
  newPosition: number,
  state: InitialStateType
) => {
  const newStartItemsIds = Array.from(columnStart.itemsIds);
  newStartItemsIds.splice(originalPosition, 1);

  const newColumnStart = {
    ...columnStart,
    itemsIds: newStartItemsIds,
  };

  const newFinishItemsIds = Array.from(columnFinish.itemsIds);

  newFinishItemsIds.splice(newPosition, 0, draggableId);

  const newColumnFinish = {
    ...columnFinish,
    itemsIds: newFinishItemsIds,
  };


  const item = (state.items)[draggableId];

  return {
    ...state,
    items: {
      ...state.items,
      [item.id]: {
        ...item,
        updated: new Date(Date.now())
      }
    },
    columns: {
      ...state.columns,
      [newColumnStart.id]: newColumnStart,
      [newColumnFinish.id]: newColumnFinish,
    },
  };
};

export const dragEndSameCol = (
  columnStart: ColumnObjectType,
  originalPosition: number,
  newPosition: number,
  draggableId: string,
  state: InitialStateType
) => {
  const newItemsIds = Array.from(columnStart.itemsIds);
  newItemsIds.splice(originalPosition, 1);
  newItemsIds.splice(newPosition, 0, draggableId);
  const newColumnStart = {
    ...columnStart,
    itemsIds: newItemsIds,
  };

  const item = (state.items)[draggableId];

  return {
    ...state,
    items: {
      ...state.items,
      [item.id]: {
        ...item,
        updated: new Date(Date.now())
      }
    },
    columns: {
      ...state.columns,
      [newColumnStart.id]: newColumnStart,
    },
  };
};

export const findColumn = (id: string, columns: ColumnType) => {
  let property = "",
    items: string[] = [],
    found = false;
  for (property in columns) {
    items = columns[property].itemsIds;
    for (let i = 0; i < items.length; i++) {
      if (id === items[i]) {
        found = true;
      }
    }
    if (found) {
      return property;
    }
  }
};

export const removeElement = (id: string, column: ColumnObjectType) => {
    for (let i=0; i< column.itemsIds.length; i++){
        if (id === column.itemsIds[i]) {

            column.itemsIds.splice(i, 1);
        }
    }
    return column.itemsIds;
}