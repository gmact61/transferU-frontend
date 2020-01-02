import React, { Component } from 'react';
import UserEvent from './UserEvent';
import { Link } from 'react-router-dom';

import { Grid, Button, Divider, Segment, Header, Image, Container, Tab } from 'semantic-ui-react'

const square = { width: 175, height: 175 }

class UserProfile extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      profile: {},
      joins: [],
      createdEvents: [],
      contentLoaded: false,
    }
  }

  componentDidMount() {
    this.setState({
      profile: this.props.profile,
      joins: this.props.joins,
      createdEvents: this.props.events.filter(event => event.user.id === this.props.profile.user.id),
      contentLoaded: true,
    })
  }

  getAttendingEvents = () => {
    return this.state.joins.map(join => {
      return join.event
    })
  }
  
  render() {

    const attendingEvents = this.getAttendingEvents();

    const panes = [
      { menuItem: 'Attending', render: () => <Tab.Pane>{attendingEvents.map(event => <UserEvent event={event} key={event.id}/>)}</Tab.Pane> },
      { menuItem: 'Created', render: () => <Tab.Pane>{this.state.createdEvents.map(event => <UserEvent event={event} key={event.id}/>)}</Tab.Pane> },
    ]

    return (
      <>
        { this.state.contentLoaded ? 
          <div className='ui center aligned container'>
            <Segment>
              <Grid>
                <Grid.Column width={4}>
                  <Segment circular style={square}>
                    <Image style={{'fontSize':62}} avatar src={this.state.profile.avatarURL}/>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={4} textAlign={'left'}>
                  <br></br>
                  <h2>{this.state.profile.name} ({this.state.profile.age})</h2>
                  <h3>{this.state.profile.school.name}</h3>
                </Grid.Column>
                <Grid.Column width={4} floated='right'>
                  <Button as={Link} to={`/edit_profile/${this.state.profile.id}`} color='teal' floated='right'>
                    Edit Profile
                  </Button>
                </Grid.Column>
              </Grid>
          </Segment>
          <Grid columns='equal'>
            <Grid.Column>
                <Segment>
                  <Header size='large'>About Me</Header>
                  <Divider />
                  <Container textAlign='left'>
                    <p>{this.state.profile.bio}</p>
                  </Container>
                </Segment>
              </Grid.Column>
            <Grid.Column width={8}>
              <Segment>
                <Header size='large'>My Events</Header>
                <Divider />
                <Tab panes={panes} />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header size='large'>Friends</Header>
                <Divider />
                <h2>None lol</h2>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
        : null
        }
      </>
    )  
  }
}

export default UserProfile;