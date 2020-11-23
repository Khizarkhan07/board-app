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
export const TitleWrapper = styled.div`
  span {
    display: none;
    margin-top: -40px;
    float: right;
  }
  &:hover {
    span {
      display: flex;
    }
  }
`;
export const BoardColumnTitle = styled.h6`
  display: flex;
  color: #314261;
  margin-bottom: 15px;
 
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
