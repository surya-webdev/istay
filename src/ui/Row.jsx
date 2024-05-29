import styled, { css } from "styled-components";

const Row = styled.div`
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
    `}
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  gap: 3rem;
  display: flex;
  margin: 2rem 0rem;
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
