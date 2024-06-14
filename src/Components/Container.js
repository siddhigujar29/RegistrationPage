import { render } from '@testing-library/react'
import React, { Component } from 'react'
import Register from './Register'
import Login from './Login'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/firestore'



const firebaseConfig = {
    apiKey: "AIzaSyCItup9ERCQ14y-DfVgStAy5Q4DukuWFT0",
    authDomain: "fir-pro-bcfb7.firebaseapp.com",
    databaseURL: "https://fir-pro-bcfb7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fir-pro-bcfb7",
    storageBucket: "fir-pro-bcfb7.appspot.com",
    messagingSenderId: "41767816398",
    appId: "1:41767816398:web:33ad5b1532d56f8547d49f"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
}


export class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            //page=0(login)  , 1=register
            page: 1,
            message: "",
            //1-sucesss, 0-error
            type: 1,
        }
    }

    pageSwitchHandler = (e) => {
        this.setState({ page: !this.state.page, message: null });
        e.preventDefault();
    };


    registrationHandler = (event) => {
        event.preventDefault();
         const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;

        if (password !== confirmPassword) {
            this.setState({ message: "password does not match", type: 0 })
            return;
        }

        const auth = firebase.auth();
        const authPromise = auth.createUserWithEmailAndPassword(email, password);
        authPromise
            .then((data) => {
                // console.log(data);
                this.setState({ message: "Registration successfully", type: 1 }, () => {
                    event.target.email.value = "";
                    event.target.password.value = "";
                    event.target.confirmPassword.value = "";
                })
            })
            .catch((error) => {
                // console.log(error.message);
                this.setState({ message: error.message, type: 0 });
            });
    };

    //login:

    loginHandler = (event) => {
        event.preventDefault();
        const auth = firebase.auth();
        const email = event.target.email.value;
        const password = event.target.password.value;


        auth
            .signInWithEmailAndPassword(email, password)
            .then((data) => {
                firebase.auth().currentUser.sendEmailVerification();
                // console.log(data);
                if(data.user.emailVerified===true){
                    this.setState({ message: 'Login Successfully', type: 1 })
                }
                else{
                    this.setState({ message: 'Your Email is not Verified yet', type: 0 })
                }
               
            })
            .catch((error) => {
                // console.log(error); 
                this.setState({ message: error.message, type: 0 })
            })
              
    }




    render() {
        return (
            <div>
                {
                    this.state.page ?
                        (<Register
                            type={this.state.type}
                            message={this.state.message}
                            switch={this.pageSwitchHandler}
                            register={this.registrationHandler}
                        />
                        ) : (<Login
                            type={this.state.type}
                            message={this.state.message}
                            switch={this.pageSwitchHandler}
                            login={this.loginHandler}
                        />
                        )}


            </div>
        )
    }
}
export default App

