import styled from "styled-components";
type BoardItemStylesProps = {
  isDragging: boolean;
};
export const BoardItemEl = styled.div<BoardItemStylesProps>`
  padding: 7px;
  background-color: ${(props) => (props.isDragging ? "#d3e4ee" : "#fff")};
  border-radius: 4px;
  transition: background-color 0.25s ease-out;

  span {
    display: none;
    margin-top: -96px;
    float: right;
  }
  div {
    font-size: 11px;
  }
  
  &:hover {
    background-color: #f7fafc;
    span {
      display: flex;
    }
    
  }

  & + & {
    margin-top: 4px;
  }
`;

export const TextAreaWrapper = styled.div`
  i {
    margin: 3px;
    float:  right;
  }
`;