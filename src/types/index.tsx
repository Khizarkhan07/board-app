export type ItemObjectType = {
    id: string;
    content: string;
    description: string;
    updated: Date;
};
export type ItemType = {
    [key: string]: ItemObjectType;
};

export type ColumnObjectType = {
    id: string;
    title: string;
    itemsIds: string[];
};

export type ColumnType = {
    [key: string]: ColumnObjectType;
};

export type InitialStateType = {
    columnsOrder: string[];
    items: ItemType;
    columns: ColumnType;
};
