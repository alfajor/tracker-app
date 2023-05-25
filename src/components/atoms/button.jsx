import styled from 'styled-components';

const Button = ({backgroundColor, textColor, buttonText, buttonType, onClick}) => {
    return (
        <StyledButton type={buttonType ? buttonType : 'button'} backgroundColor={backgroundColor} textColor={textColor} onClick={onClick}>
            {buttonText}
        </StyledButton>
    )
}

const StyledButton = styled.button`
    border: 1px solid #ecd150;
    border-radius: 2px;
    background-color: ${(props) => props.backgroundColor ? props.backgroundColor : 'transparent'};
    color: ${(props) => props.textColor ? props.textColor : '#222'};
    padding: 1em;
    margin-left: 1em;
    cursor: pointer;
`;

export default Button;