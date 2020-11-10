import React, { useState } from "react";
import { Board } from "../contexts/BoardContext";
import { Droppable } from "react-beautiful-dnd";
import { nanoid } from "nanoid";
import {
  BoardColumnWrapper,
  BoardColumnContent,
  AddButtonWrapper,
  BoardColumnTitle,
} from "./board.column.styles";

import { BoardItem } from "./BoardItem";
import { ButtonWIthIcon } from "./ButtonWithIcon";
import { ColumnObjectType, ItemObjectType} from "../types";
import {TextAreaWrapper} from "./boardItem.styles";

type BoardColumnProps = {
  key: string;
  column: ColumnObjectType;
  items: ItemObjectType[];
};

export const BoardColumn: React.FC<BoardColumnProps> = (props) => {
  const { dispatch } = Board();
  const [addField, setAddField] = useState<boolean>(false);
  const [addCardField, setAddCardField] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>("");

  const addClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAddField(true);
  };

  const addCardClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAddCardField(true);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { column: props.column.id, item: { content, id: nanoid() } },
    });
    setAddField(false);
  };

  const addCard = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: "ADD_CARD",
      payload: { column: { title: title, id: nanoid(), itemsIds: [] } },
    });
    setAddCardField(false);
  };

  return (
    <BoardColumnWrapper>
      {props.column.title ? (
        <>
          <BoardColumnTitle>{props.column.title}</BoardColumnTitle>

          <Droppable droppableId={props.column.id}>
            {(provided, snapshot) => (
              <BoardColumnContent
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.items.map((item: any, index: number) => (
                  <BoardItem key={item.id} item={item} index={index} />
                ))}
                {provided.placeholder}
              </BoardColumnContent>
            )}
          </Droppable>

          {!addField ? (
            <AddButtonWrapper>
              <ButtonWIthIcon
                callback={addClick}
                icon={"fa fa-plus"}
                text={"Add another card"}

              />
            </AddButtonWrapper>
          ) : (
            <TextAreaWrapper>
              <i
                  onClick={(e) => {
                    setAddField(false);
                  }}
                  className={"fa fa-times"}
              />
              <textarea
                className="form-control mb-1"
                placeholder={"Enter a title for this card"}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
              <ButtonWIthIcon
                callback={addItem}
                color={"#5aac44"}
                text={"Add"}
              />
            </TextAreaWrapper>
          )}
        </>
      ) : (
        <>
          {!addCardField ? (
              <AddButtonWrapper>
                <ButtonWIthIcon
                    callback={addCardClick}
                    icon={"fa fa-plus"}
                    text={"Add card"}
                />
              </AddButtonWrapper>
          ) : (
              <TextAreaWrapper>
                <i
                    onClick={(e) => {
                      setAddCardField(false);
                    }}
                    className={"fa fa-times"}
                />
              <textarea
                  className="form-control mb-1"
                  placeholder={"Enter a title for this card"}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
              />
                <ButtonWIthIcon
                    callback={addCard}
                    color={"#5aac44"}
                    text={"Add"}
                />
              </TextAreaWrapper>
          )}
        </>
      )}
    </BoardColumnWrapper>
  );
};
