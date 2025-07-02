import styled from "styled-components";

const StyledContainer = styled.div`
  width: 90%;
  max-width: ${({ maxWidth }) => maxWidth || "1200px"};
  margin: 0 auto;
  padding: ${({ padding }) => padding || "0"};
`;

const Container = ({ children, maxWidth, padding, className, ...props }) => {
  return (
    <StyledContainer
      maxWidth={maxWidth}
      padding={padding}
      className={className}
      {...props}
    >
      {children}
    </StyledContainer>
  );
};

export default Container;
