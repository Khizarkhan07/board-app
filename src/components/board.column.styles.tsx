import styled from "styled-components";

type BoardColumnContentStylesProps = {
  isDraggingOver: boolean;
};

export const BoardColumnWrapper = styled.div`
  flex: 1;
  padding: 8px;
  background-color: #ebecf0;
  border-radius: 4px;

  & + & {
    margin-left: 12px;
  }
`;

export const BoardColumnTitle = styled.h6`
  color: #314261;
  margin-bottom: 12px;
`;

export const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  min-height: 20px;
  background-color: ${(props) => (props.isDraggingOver ? "#aecde0" : null)};
  border-radius: 4px;
`;

export const AddButtonWrapper = styled.div`
  min-height: 20px;
  border-radius: 4px;
  margin-top: 5px;
  
`;
