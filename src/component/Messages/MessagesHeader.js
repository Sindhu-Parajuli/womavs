import React from 'react'
import {Header , Segment , Input , Icon} from 'semantic-ui-react'

class MessagesHeader extends React.Component {
    render()
    {
        return(
            <segment clearing>
                <Header fluid = "true" as ="h2" floated="left" style={{marginBottom:0}}>
                  <span>
                      <b> Rooms  </b>

                    <Icon name = {"star outline"} color = "orange"/>

                </span>

                </Header>

                <Header floated= "right">
                    <Input
                        size = "mini"
                        icon = "search"
                        name = "searchTerm"
                        placeholder = "Search Messages"
                        />

                </Header>
            </segment>

        )
    }
}
export default MessagesHeader;