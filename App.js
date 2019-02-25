import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight, TextInput} from 'react-native';
import {f, auth, database} from './config/config.js';

export default class App extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      loggedin: false
    };

    var that = this;
    f.auth().onAuthStateChanged(function(user){
      if(user){
        that.setState({
          loggedin:true
        });
        console.log('logged in', user);
      }else{
        that.setState({
          loggedin:false
        });
        console.log('logged out');
      }
    });
  }

  loginUser = async(email, pass) => {

    if(email != '' && pass != ''){
      try{
        let user = await auth.signInWithEmailAndPassword(email, pass);
        console.log(user);
      } catch(error){
        console.log(error);
      }
    }else{
      alert('Missing email or password');
    }
  }

  registerUser = (email, password) => {

    console.log(email, password);
    auth.createUserWithEmailAndPassword(email, password)
    .then((userObj) => console.log(email, password, userObj))
    .catch((error) => console.log('error logging in', error));
  }

  signUserOut = () => {
    auth.signOut()
    .then(() => {
      console.log('Logged out...');
    }).catch((error) =>{
      console.log('Error', error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text>---------</Text>
        { this.state.loggedin == true ? (
          <View>
            <TouchableHighlight
              onPress={ () => this.signUserOut() }
              style={{backgroundColor: 'red'}}>
                <Text>Log Out</Text>
            </TouchableHighlight>
            <Text>Logged in...</Text>
          </View>
        ) : (
          <View>

            { this.state.emailloginView == true ? (

              <View>
                <Text>Email:</Text>
                <TextInput
                  onChangeText={(text) => this.setState({email: text})}
                  value={this.state.email}
                />

                <Text>Password:</Text>
                <TextInput
                  onChangeText={(text) => this.setState({pass: text})}
                  secureTextEntry={true}
                  value={this.state.pass}
                />

                <TouchableHighlight
                  onPress={ () => this.loginUser(this.state.email, this.state.pass) }
                  style={{backgroundColor: 'red'}}>
                    <Text>Login</Text>
                </TouchableHighlight>
              </View>

            ) : (
              <View></View>
            )}

            <TouchableHighlight
            onPress={() => this.setState({emailloginView: true})}
            style={{backgroundColor:'green'}}>
            <Text style={{color:'white'}}>Login with Email</Text>
            </TouchableHighlight>

            <TouchableHighlight style={{backgroundColor:'green'}}>
            <Text style={{color:'white'}}>Login with Facebook</Text>
            </TouchableHighlight>
          </View>

      )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

// database.ref('/refName/childRef2').set("value!");

// var updates = {};
// updates['/refName/childRef'] = 'Database';
// updates['/anotherRefName'] = 'another Database';
// updates['/numbers'] = '5';
// updates['/numbers'] = '6';
// database.ref().update(updates);

// database.ref('/numbers/5').remove();

database.r