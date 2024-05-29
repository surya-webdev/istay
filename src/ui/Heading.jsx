import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
      ${(props) =>
    props.as === "p" &&
    css`
      font-size: 1.8rem;
      font-weight: 400;
    `}
    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 4rem;
      font-weight: 600;
      text-align: center;
    `}
`;

Heading.defaultProps = {
  as: "h1",
};

export default Heading;
