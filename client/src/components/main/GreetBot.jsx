import React from 'react';
import ChatBot from '../../../react-simple-chatbot';
import Credentials from '../login/Credentials.jsx';

class GreetForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favFood: '',
      opened: true,
    };
  }


  toggleFloating({ opened }) {
    this.setState({ opened });
  }


  render() {
    const { favFood, opened } = this.state;
    const {
      user, saveAllergy, signUp, login, buttonClicked, whichFailed, guestLogin,
    } = this.props;
    const voices = speechSynthesis.getVoices();
    let voice = voices[4];
    if (voices.length > 40) {
      voice = voices[49];
    }
    if (window.previous === 'signup') {
      window.previous = '/';
      return (
        <ChatBot
          headerTitle="C.A.I.N."
          speechSynthesis={{ enable: true, lang: 'en', voice }}
          steps={[
            {
              id: '1',
              message: `Hello ${user}, I am 'CAIN', (Client. Appetite. Indulgence. Network).`,
              trigger: '3',
            },
            {
              id: '3',
              message: 'Please tell me if you have any allergies!\nYou can list them below, separated by a comma',
              trigger: 'allergies',
            },
            {
              id: 'allergies',
              user: true,
              validator: (value) => {
                if (value) {
                  const allergy = value.split(',');
                  saveAllergy(user, allergy);
                  return true;
                }
                return true;
              },
              trigger: '4',
            },
            {
              id: '4',
              message: 'Thank you! The following allergies: {previousValue} have been saved.',
              trigger: '5',
            },
            {
              id: '5',
              message: 'What is your favorite food?',
              trigger: 'favFood',
            },
            {
              id: 'favFood',
              user: true,
              validator: (value) => {
                if (value) {
                  this.setState({ favFood: value });
                  return true;
                }
                return true;
              },
              trigger: '6',
            },
            {
              id: '6',
              message: 'Fuck yeah, {previousValue}!!!',
              trigger: '7',
            },
            {
              id: '7',
              message: 'Would you like to update any of the previous fields?',
              trigger: 'update-question',
            },
            {
              id: 'update-question',
              options: [
                { value: 'yes', label: 'Yes', trigger: 'update-yes' },
                { value: 'no', label: 'No', trigger: 'end-message' },
              ],
            },
            {
              id: 'update-yes',
              message: 'What field would you like to update?',
              trigger: 'update-fields',
            },
            {
              id: 'update-fields',
              options: [
                { value: 'allergies', label: 'allergies', trigger: 'update-allergies' },
                { value: 'favFoods', label: 'Favorite Food', trigger: 'update-favFood' },
              ],
            },
            {
              id: 'update-allergies',
              update: 'allergies',
              trigger: 'allergies',
            },
            {
              id: 'update-favFood',
              update: 'favFood',
              trigger: 'favFood',
            },
            {
              id: 'end-message',
              message: 'Thanks! Your data was submitted successfully!',
              end: true,
            },
          ]}
          floating
          opened={opened}
          toggleFloating={this.toggleFloating}
        />
      );
    } if (window.previous === 'login') {
      window.previous = '/';
      return (
        <ChatBot
          headerTitle="C.A.I.N."
          speechSynthesis={{ enable: true, lang: 'en', voice: voices[4] }}
          recognitionEnable
          steps={[
            {
              id: '1',
              message: `Welcome back ${user}!, I am 'CAIN'. 
              The "Client, Appitite, Indulgence, Network".`,
              trigger: '2',
            },
            {
              id: '2',
              message: `Let me know if I can be of assistance. 
              You may type help for a list of commands`,
              trigger: '3',
            },
            {
              id: '3',
              message: 'Okay! How can I help?',
              user: true,
              trigger: '4',
            },
            {
              id: '4',
              options: [
                { value: 'Switch Account/Create Account', label: 'Switch Account\nor\nCreate Account', trigger: '5' },
                { value: 'Logout', label: 'Log me out', trigger: '6' },
                { value: 'Give me a compliment', label: 'Give me a compliment', trigger: '7' },
                { value: 'Tell me a joke', label: 'Tell me a joke', trigger: '8' },
              ],
            },
            {
              id: '5',
              component: (
                <Credentials
                signUp={window.signup}
                login={window.login}
                guestLogin={window.guest}
              />
              ),
              trigger: '2',
            },
            {
              id: '6',
              message: 'Please click to confirm logout.',
              trigger: 'logout',
            },
            {
              id: 'logout',
              user: true,
              validator: () => {
                window.logout();
              },
              end: true,
            },
            {
              id: '7',
              options: [
                { value: 'yes', label: 'Yes', trigger: 'update-yes' },
                { value: 'no', label: 'No', trigger: 'end-message' },
              ],
            },
            {
              id: 'update-yes',
              message: 'What field would you like to update?',
              trigger: '8',
            },
            {
              id: '8',
              options: [
                { value: 'name', label: 'Name', trigger: 'update-name' },
                { value: 'allergies', label: 'allergies', trigger: 'update-allergies' },
                { value: 'favFoods', label: 'Favorite Food', trigger: 'update-favFood' },
              ],
            },
            {
              id: 'update-name',
              update: 'name',
              trigger: '7',
            },
            {
              id: 'update-allergies',
              update: 'allergies',
              trigger: '7',
            },
            {
              id: 'update-favFood',
              update: 'favFood',
              trigger: '7',
            },
            {
              id: 'end-message',
              message: 'Thanks! Your data was submitted successfully!',
              end: true,
            },
          ]}
          floating
          opened={opened}
          toggleFloating={this.toggleFloating}
        />
      );
    } if (window.previous === 'guest') {
      window.previous = '/';
      return (
        <ChatBot
          headerTitle="C.A.I.N."
          speechSynthesis={{ enable: true, lang: 'en', voice: voices[4] }}
          recognitionEnable
          steps={[
            {
              id: '1',
              message: `Hello ${user}!, I am 'CAIN'. 
              The "Client, Appitite, Indulgence, Network".`,
              trigger: '3',
            },
            {
              id: '3',
              message: 'To get started, begin typing the ingredients you have on hand, or want to avoid, in the search field. After you are satisfied with your ingredients, just click the "Search for a recipe" button and you will be presented with a custom recipe list, tailored to your specifications',
              trigger: '4',
            },
            {
              id: '4',
              options: [
                { value: 'Switch Account/Create Account', label: 'Switch Account\nor\nCreate Account', trigger: '5' },
                { value: 'Logout', label: 'Log me out', trigger: '6' },
                { value: 'Give me a compliment', label: 'Give me a compliment', trigger: '7' },
                { value: 'Tell me a joke', label: 'Tell me a joke', trigger: '8' },
              ],
            },
            {
              id: '5',
              component: (
                <Credentials
                  signUp={window.signup}
                  login={window.login}
                  guestLogin={window.guest}
                />
              ),
              trigger: '2',
            },
            {
              id: '6',
              message: 'Please click to confirm logout.',
              trigger: 'logout',
            },
            {
              id: 'logout',
              user: true,
              validator: () => {
                window.logout();
              },
              end: true,
            },
            {
              id: '7',
              message: 'Would you like to update any of the previous fields?',
              trigger: 'update-question',
            },
            {
              id: 'update-question',
              options: [
                { value: 'yes', label: 'Yes', trigger: 'update-yes' },
                { value: 'no', label: 'No', trigger: 'end-message' },
              ],
            },
            {
              id: 'update-yes',
              message: 'What field would you like to update?',
              trigger: '8',
            },
            {
              id: '8',
              options: [
                { value: 'name', label: 'Name', trigger: 'update-name' },
                { value: 'allergies', label: 'allergies', trigger: 'update-allergies' },
                { value: 'favFoods', label: 'Favorite Food', trigger: 'update-favFood' },
              ],
            },
            {
              id: 'update-name',
              update: 'name',
              trigger: '7',
            },
            {
              id: 'update-allergies',
              update: 'allergies',
              trigger: '7',
            },
            {
              id: 'update-favFood',
              update: 'favFood',
              trigger: '7',
            },
            {
              id: 'end-message',
              message: 'Thanks! Your data was submitted successfully!',
              end: true,
            },
          ]}
          floating
          opened={opened}
          toggleFloating={this.toggleFloating}
        />
      );
    }
    return (
      <ChatBot
        headerTitle="C.A.I.N."
        speechSynthesis={{ enable: true, lang: 'en', voice: voices[4] }}
        recognitionEnable
        steps={[
          {
            id: '3',
            message: 'How can I help?',
            trigger: '4',
          },
          // {
          //   id: 'wait',
          //   message: "I'll be right over here if you need anything.",
          //   trigger: '4',
          // },
          {
            id: '4',
            options: [
              { value: 'Switch Account/Create Account', label: 'Switch Account\nor\nCreate Account', trigger: '5' },
              { value: 'Logout', label: 'Log me out', trigger: '6' },
              { value: 'Give me a compliment', label: 'Give me a compliment', trigger: '7' },
              { value: 'Tell me a joke', label: 'Tell me a joke', trigger: '8' },
            ],
          },
          {
            id: '5',
            component: (
              <Credentials
                signUp={window.signup}
                login={window.login}
                guestLogin={window.guest}
              />
            ),
            trigger: 'favFood',
          },
          {
            id: 'favFood',
            user: true,
            validator: (value) => {
              if (value) {
                this.setState({ favFood: value });
                return true;
              }
              return true;
            },
            trigger: '6',
          },
          {
            id: '6',
            message: 'Fuck yeah, {previousValue}!!!',
            trigger: '7',
          },
          {
            id: '7',
            message: 'Would you like to update any of the previous fields?',
            trigger: 'update-question',
          },
          {
            id: 'update-question',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'update-yes' },
              { value: 'no', label: 'No', trigger: 'end-message' },
            ],
          },
          {
            id: 'update-yes',
            message: 'What field would you like to update?',
            trigger: '8',
          },
          {
            id: '8',
            options: [
              { value: 'name', label: 'Name', trigger: 'update-name' },
              { value: 'allergies', label: 'allergies', trigger: 'update-allergies' },
              { value: 'favFoods', label: 'Favorite Food', trigger: 'update-favFood' },
            ],
          },
          {
            id: 'update-name',
            update: 'name',
            trigger: '7',
          },
          {
            id: 'update-allergies',
            update: 'allergies',
            trigger: '7',
          },
          {
            id: 'update-favFood',
            update: 'favFood',
            trigger: '7',
          },
          {
            id: 'end-message',
            message: 'Thanks! Your data was submitted successfully!',
            end: true,
          },
        ]}
        floating
      />
    );
  }
}


export default GreetForm;
