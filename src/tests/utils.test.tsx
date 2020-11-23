import {initialState,} from "../contexts/BoardContext";
import React from 'react'
import {dragEndDifferentCol, dragEndSameCol, findColumn, removeElement} from "../utils/util";

test('Drag item in same column', () => {

    const result  = dragEndSameCol({ id: "column-1",
        title: "ToDos",
        itemsIds: ["1", "2", "3"]}, 0, 1, "1", initialState)

    expect(result.columns).toEqual({
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
    })

});

test('Drag item in different column', () => {

    const result = dragEndDifferentCol({ id: "column-1",
        title: "ToDos",
        itemsIds: ["1", "2", "3"]}, 0,  {
        id: "column-2",
        title: "Under Development",
        itemsIds: [],
    } , "1", 0,initialState)
    expect (result.columns).toEqual( {
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
    },)

});

test('Remove Item in a  column', () => {

    const result = removeElement("2", {
        id: "column-1",
        title: "ToDos",
        itemsIds: ["2", "1", "3"],
    })
    expect (result).toEqual( ["1", "3"])

});

test('Find Column With Element', ()=> {
    const result = findColumn("1", {"column-3": {
        id: "column-3",
            title: "QA",
            itemsIds: ["1"],
    }},)
    expect(result).toEqual("column-3")
})
