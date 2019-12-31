import React, { Component } from 'react';
import UserEvents from './UserEvents'
import { api } from '../services/api';

import { Grid, Divider, Segment, Header, Container } from 'semantic-ui-react'


const square = { width: 175, height: 175 }

const URL = 'http://localhost:3001'


class UserProfile extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      profile: {},
      eventUserJoins: []
    }
    this.userId = this.props.match.params.id
  }


  componentDidMount() {
    fetch(URL + '/event_users')
    .then(res => res.json())
    .then(joins => {
      this.setState({eventUserJoins: joins})
    })
  }

  getUserEventsJoins = () => {
    return this.state.eventUserJoins.filter(join => join.user.id == this.props.match.params.id && join.attending === true );
  }

  getUserEvents = () => {
    let joins = this.getUserEventsJoins()
    return joins.map(join => {
      return join.event
    })
  }
  

  render() {

    const { name, age, bio, imgUrl, school } = this.state.profile

    const userEvents = this.getUserEvents();

    return (
      <div className='ui center aligned container'>
        <Segment>
          <Grid>
            <Grid.Column width={4}>
              <Segment circular style={square}>
                <img src={imgUrl}/>
              </Segment>
            </Grid.Column>
            <Grid.Column width={4} textAlign={'left'}>
              <br></br>
              <h2>{name} ({age})</h2>
              <h3>{school.name}</h3>
            </Grid.Column>
          </Grid>
      </Segment>
      <Grid columns='equal'>
        <Grid.Column>
            <Segment>
              <Header size='large'>About Me</Header>
              <Divider />
              <Container textAlign='left'>
                <p>{bio}</p>
              </Container>
            </Segment>
          </Grid.Column>
        <Grid.Column width={8}>
          <Segment>
            <Header size='large'>My Events</Header>
            <Divider />
            {userEvents.map(userEvent => <UserEvents event={userEvent} key={userEvent.id}/>)}
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
    )  
  }
}

export default UserProfile;