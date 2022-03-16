import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

export function setCaretIcon(x){
    if (x.charAt(0) === "-") {
        return (
          <FontAwesomeIcon
            style={{ fontSize: "12px" }}
            icon={faCaretDown}
          />
        );
    }else{
        return (
          <FontAwesomeIcon
            style={{ fontSize: "12px" }}
            icon={faCaretUp}
          />
        );
    }
}