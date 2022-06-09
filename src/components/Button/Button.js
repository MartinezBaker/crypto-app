import { MarketDaysButton } from "./styles"

const Button = (props) => {
    return(
        <div>
            <MarketDaysButton active={props.active} onClick={() => props.handleClick(props.name)}>{props.name}</MarketDaysButton>
        </div>
    )
}

export default Button;