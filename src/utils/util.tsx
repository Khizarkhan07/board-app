import {ColumnObjectType, ColumnType, InitialStateType} from '../types'
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

    return {
        ...state,
        columns: {
            ...state.columns,
            [newColumnStart.id]: newColumnStart,
            [newColumnFinish.id]: newColumnFinish,
        },
    };
};


export const dragEndSameCol = (columnStart : ColumnObjectType,originalPosition: number, newPosition: number, draggableId: string, state: InitialStateType) => {
    const newItemsIds = Array.from(columnStart.itemsIds);
    newItemsIds.splice(originalPosition, 1);
    newItemsIds.splice(
        newPosition,
        0,
        draggableId
    );
    const newColumnStart = {
        ...columnStart,
        itemsIds: newItemsIds,
    };

    return {
        ...state,
        columns: {
            ...state.columns,
            [newColumnStart.id]: newColumnStart,
        },
    };
}

export const removeElement = (id: string, columns:ColumnType ) => {
    for (const property in columns) {
        const items = columns[property].itemsIds;

        for(let i=0 ; i < items.length; i++){
            if(id === items[i]){
                items.splice(i, 1);
                break
            }
        }
        return[items, property]
    }
}