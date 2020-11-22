import React, {useCallback} from "react";
import CallIcon from "@material-ui/icons/Call";

export default function VideoCallButton(props) {
    return (
        <CallIcon
            className="start-button"
            disabled={props.disabled}
            onClick={props.onClick}
        >
            Click to start a call
        </CallIcon>
    );
}