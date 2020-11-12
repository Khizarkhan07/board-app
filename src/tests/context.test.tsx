import {AppProvider, BoardContext, initialState,} from "../contexts/BoardContext";
import React, {useContext} from 'react'
import {mount, shallow} from "enzyme";
import {CheckboxWithLabel} from "../components/checkboxWithLabel";
import {BoardItem} from "../components/BoardItem";
import {ButtonWIthIcon} from "../components/ButtonWithIcon";
import {dragEndDifferentCol, dragEndSameCol} from "../utils/util";

test('ADD_ITEM', () => {
    const wrapper = shallow(<BoardItem index={1} item={{ id: "1", content: "Learn TypeScript" }}/>)

});

test('Drag item in same column', () => {
    expect(dragEndSameCol({ id: "column-1",
        title: "ToDos",
        itemsIds: ["1", "2", "3"]}, 0, 1, "1", initialState))
        .toEqual({
            items: {
                "1": { id: "1", content: "Learn TypeScript" },
                "2": { id: "2", content: "Build Basic Trello" },
                "3": { id: "3", content: "Use Strongly Type Components" },
            },

            columns: {
                "column-1": {
                    id: "column-1",
                    title: "ToDos",
                    itemsIds: ["2", "1", "3"],
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
        })
});

test('Drag item in different column', () => {
    expect(dragEndDifferentCol({ id: "column-1",
        title: "ToDos",
        itemsIds: ["1", "2", "3"]}, 0,  {
        id: "column-2",
        title: "Under Development",
        itemsIds: [],
    } , "1", 0,initialState))
        .toEqual({
            items: {
                "1": { id: "1", content: "Learn TypeScript" },
                "2": { id: "2", content: "Build Basic Trello" },
                "3": { id: "3", content: "Use Strongly Type Components" },
            },

            columns: {
                "column-1": {
                    id: "column-1",
                    title: "ToDos",
                    itemsIds: ["2", "3"],
                },
                "column-2": {
                    id: "column-2",
                    title: "Under Development",
                    itemsIds: ["1"],
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
        })
});