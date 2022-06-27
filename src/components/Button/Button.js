import { connect } from 'react-redux'
import { marketDaysClick } from 'store/Coins/actions'
import { MarketDaysButton } from "./styles"

const Button = (props) => {
    return(
        <div>
            <MarketDaysButton active={props.active} onClick={() => props.marketDaysClick(props.name)}>{props.name}</MarketDaysButton>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        marketDaysClick: (days) => dispatch(marketDaysClick(days))
    }
}

export default connect(null, mapDispatchToProps)(Button);