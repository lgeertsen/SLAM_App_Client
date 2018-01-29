// import Expo from 'expo';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';

export default class Login extends React.Component {
  state = {

  };

  render() {
    return (
      <Container>
        <Content>
          <Item stackedLabel>
            <Label>Email</Label>
            <Input value={this.props.username} onChange={(e) => this.props.usernameChange(e)}/>
          </Item>
          <Item stackedLabel last>
            <Label>Password</Label>
            <Input value={this.props.password} onChange={(e) => this.props.passwordChange(e)}/>
          </Item>
          <Button danger onPress={() => this.props.login()}>
            <Text>Login</Text>
          </Button>
        </Content>
      </Container>
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
