import React, { useState } from "react";
import { useBoard } from "../../contexts/BoardContext";
import {Droppable, Draggable, DraggableProvided, DraggableStateSnapshot} from "react-beautiful-dnd";
import { nanoid } from "nanoid";
import {
  BoardColumnWrapper,
  BoardColumnContent,
  AddButtonWrapper,
  BoardColumnTitle,
  TitleWrapper,
} from "./column.styles";

import { Card } from "../card/Card";
import { ButtonWIthIcon } from "../ButtonWithIcon";
import { ColumnObjectType, ItemObjectType } from "../../types";
import { TextAreaWrapper } from "../card/card.styles";

type BoardColumnProps = {
  key: string;
  column: ColumnObjectType;
  items: ItemObjectType[];
  index: number;
};

export const Column: React.FC<BoardColumnProps> = (props) => {
  const { dispatch } = useBoard();
  const [addField, setAddField] = useState<boolean>(false);
  const [titleToggle, setTitleToggle] = useState<boolean>(false);
  const [addCardField, setAddCardField] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [columnTitle, setColumnTitle] = useState<string>(props.column.title);
  const [content, setContent] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const addClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAddField(true);
  };

  const addCardClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAddCardField(true);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { column: props.column.id, item: { content, id: nanoid(), description, updated: new Date(Date.now()) } },
    });
    setAddField(false);
  };
  const editColumnTitle = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: "EDIT_COLUMN_TITLE",
      payload: { column: props.column.id, title: { columnTitle } },
    });
    setTitleToggle(false);
  };

  const addCard = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: "ADD_CARD",
      payload: { column: { title: title, id: nanoid(), itemsIds: [] } },
    });
    setAddCardField(false);
  };

  return (

    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (

          <BoardColumnWrapper
              {...provided.draggableProps}
              ref={provided.innerRef}
          >
            {props.column.title ? (
                <React.Fragment>
                  {!titleToggle ? (
                      <TitleWrapper>
                        <BoardColumnTitle
                            {...provided.dragHandleProps}>{props.column.title}</BoardColumnTitle>
                        <span>
                <ButtonWIthIcon
                    icon="fa fa-pencil"
                    callback={(e) => {
                      setTitleToggle(true);
                    }}
                />
              </span>
                      </TitleWrapper>
                  ) : (
                      <TextAreaWrapper>
                        <i
                            onClick={(e) => {
                              setTitleToggle(false);
                              setColumnTitle(props.column.title);
                            }}
                            className="fa fa-times"
                        />
                        <textarea
                            className="form-control mb-1"
                            placeholder="Enter a title for this column"
                            value={columnTitle}
                            onChange={(e) => {
                              setColumnTitle(e.target.value);
                            }}
                        />
                        <ButtonWIthIcon
                            callback={editColumnTitle}
                            color="#5aac44"
                            text="Add"
                        />
                      </TextAreaWrapper>
                  )}

                  <Droppable droppableId={props.column.id} type={"task"}>
                    {(provided, snapshot) => (
                        <BoardColumnContent
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                          {props.items.map((item: any, index: number) => (
                              <Card key={item.id} item={item} index={index} />
                          ))}
                          {provided.placeholder}
                        </BoardColumnContent>
                    )}
                  </Droppable>

                  {!addField ? (
                      <AddButtonWrapper>
                        <ButtonWIthIcon
                            callback={addClick}
                            icon="fa fa-plus"
                            text="Add another card"
                        />
                      </AddButtonWrapper>
                  ) : (
                      <TextAreaWrapper>
                        <i
                            onClick={(e) => {
                              setAddField(false);
                            }}
                            className="fa fa-times"
                        />
                        <textarea
                            rows={1}
                            className="form-control mb-1"
                            placeholder="title"
                            onChange={(e) => {
                              setContent(e.target.value);
                            }}
                        />
                        <textarea
                            className="form-control mb-1"
                            placeholder="description"
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                        />
                        <ButtonWIthIcon callback={addItem} color="#5aac44" text="Add" />
                      </TextAreaWrapper>
                  )}
                </React.Fragment>
            ) : (
                <React.Fragment>
                  {!addCardField ? (
                      <AddButtonWrapper>
                        <ButtonWIthIcon
                            callback={addCardClick}
                            icon="fa fa-plus"
                            text="Add Column"
                        />
                      </AddButtonWrapper>
                  ) : (
                      <TextAreaWrapper>
                        <i
                            onClick={(e) => {
                              setAddCardField(false);
                            }}
                            className="fa fa-times"
                        />
                        <textarea
                            className="form-control mb-1"
                            placeholder="Enter a title for this card"
                            onChange={(e) => {
                              setTitle(e.target.value);
                            }}
                        />
                        <ButtonWIthIcon callback={addCard} color="#5aac44" text="Add" />
                      </TextAreaWrapper>
                  )}
                </React.Fragment>
            )}
          </BoardColumnWrapper>
      )}
    </Draggable>
  );
};
