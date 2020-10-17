import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import {Grid} from 'semantic-ui-react';

import colorPanel from "./component/colorPanel/colorPanel";
import metapanel from "./component/metapanel/metapanel";
import sidePanel from "./component/sidePanel/sidePanel";
import messages from "./component/messages/messages";

const Chatroom = () => (
    <Grid>
     <colorPanel />
     <sidePanel />
     <messages />
     <metapanel />
    </Grid>

);

export default Chatroom;
