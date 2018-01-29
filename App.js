import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';

import axios from 'axios';
import querystring from 'querystring';

import Login from './components/Login';

export default class App extends React.Component {
  state = {
    fontLoaded: false,
    isConnected: false,
    data: null,
    authenticated: false,
    username: '',
    password: ''
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  login() {
    axios.post('https://lets-go2.herokuapp.com/oauth/token', querystring.stringify({
      // 'form_params': {
        'grant_type': 'password',
        'client_id': 71,
        'client_secret': '1VvImNt11pwDkv7hoIcdOfAweZLtN9NVMwgNl7VT',
        'username': this.state.username,
        'password': this.state.password,
        'scope': '*',
      // }
    }))
    .then(response => {
      console.log(response);
      this.setState({'authenticated': true, 'accessToken': response.data.access_token})
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    let pic = {
      uri: 'https://i.imgur.com/yUEddOv.png'
    };

    return (
      this.state.fontLoaded ? (
        !this.state.authenticated ?
        (<Login username={this.state.username}
              usernameChange={(e) => this.setState({'username': e.target.value})}
              password={this.state.password}
              passwordChange={(e) => this.setState({'password': e.target.value})}
              login={() => this.login()}/>) :
        (<Container>
          <Header>
            <Left>
              <Button transparent>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title>SLAM</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <Image source={pic} style={{width: 70, height: 70}}/>
            <Text>
              This is the SLAM Client App
            </Text>
          </Content>
          <Footer>
            <FooterTab>
              <Button full>
                <Text>Footer</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>)
      ) : null
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
