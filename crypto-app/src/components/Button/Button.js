import { MarketDaysButton } from "./styles"

const Button = (props) => {
    return(
        <div>
            <MarketDaysButton  darkMode={props.darkMode} active={props.active} onClick={() => props.handleClick(props.name)}>{props.name}</MarketDaysButton>
        </div>
    )
}

export default Button;