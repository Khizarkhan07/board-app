import React, {  useState } from "react";
import {useBoard} from "../../contexts/BoardContext";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

import { BoardItemEl, TextAreaWrapper } from "./card.styles";
import { ItemObjectType } from "../../types"
import { ButtonWIthIcon } from "../ButtonWithIcon";

type BoardItemProps = {
  index: number;
  item: ItemObjectType;
};

export const Card: React.FC<BoardItemProps> = ({ index, item }) => {

  const { dispatch } = useBoard();
  const [editState, setEditState] = useState(false);
  const [itemContent, setItemContent] = useState(item.content);
  const handleEditState = (e: React.MouseEvent<HTMLButtonElement>) => {
    setEditState(true);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({type: 'DELETE_ITEM', payload: {item}})
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({type: 'EDIT_ITEM', payload: {item: {id: item.id, content: itemContent}}})
    setEditState(false);
  };
  return (
    <React.Fragment>
      {!editState ? (
        <Draggable draggableId={item.id} index={index}>
          {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
            <BoardItemEl
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              {item.content}
              <span>
                <ButtonWIthIcon
                  icon="fa fa-pencil"
                  callback={handleEditState}
                />
                <ButtonWIthIcon
                    icon="fa fa-trash"
                    callback={handleDelete}
                />
              </span>
            </BoardItemEl>
          )}
        </Draggable>
      ) : (
        <TextAreaWrapper>
          <i
            onClick={(e) => {
              setEditState(false);
            }}
            className="fa fa-times"
          />
          <textarea
            className="form-control mb-1 mt-1"
            value={itemContent}
            onChange={(e) => {
              setItemContent(e.target.value);
            }}
          />
          <ButtonWIthIcon
            text="Save"
            color="#5aac44"
            callback={handleEdit}
          />

        </TextAreaWrapper>
      )}
    </React.Fragment>
  );
};
