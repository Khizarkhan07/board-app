import React, {useCallback, useState} from "react";
import {useBoard} from "../../contexts/BoardContext";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

import { BoardItemEl, TextAreaWrapper } from "./card.styles";
import {BoardColumnTitle} from "../column/column.styles";
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
  const [description, setDescription] = useState(item.description);

  const handleEditState = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setEditState(true);
  },[editState]);

  const handleDelete = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({type: 'DELETE_ITEM', payload: {item}})
  },[item]);

  const handleEdit =  (e: React.MouseEvent<HTMLButtonElement>) => {
    if(Boolean(itemContent) && Boolean(description)){
      dispatch({type: 'EDIT_ITEM', payload: {item: {id: item.id, content: itemContent, description, updated: new Date(Date.now())}}})
      setEditState(false);
    }

  };

  const handleEditToogle = useCallback((e : React.MouseEvent<HTMLButtonElement>) => {
    setEditState(!editState)
  }, [editState])

  const handleItemContent = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setItemContent(e.target.value)
  }, [itemContent])

  const handleDescription = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }, [description])


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
              <BoardColumnTitle> {item.content} </BoardColumnTitle>
              <hr/>
              {item.description}
              <br/>
              <div className={"text-muted"}>
              {item.updated.toLocaleTimeString()}
              </div>
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
            onClick={handleEditToogle}
            className="fa fa-times"
          />
          <textarea
            rows={1}
            className="form-control mb-1 mt-1"
            value={itemContent}
            onChange={handleItemContent}
          />
          <textarea
              className="form-control mb-1 mt-1"
              value={description}
              onChange={handleDescription}
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
