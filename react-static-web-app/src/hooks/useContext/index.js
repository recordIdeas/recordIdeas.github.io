import { createContext, useContext, useState } from 'react';

const CurrentUserContext = createContext(null);
const ThemeContext = createContext(null);

export default function useContextHook() {
  const [theme, setTheme] = useState('light');

  return (
    <MyProviders theme={theme}>
      <WelcomePanel />
      <label>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={(e) => {
            setTheme(e.target.checked ? 'dark' : 'light')
          }}
        />
        Use dark mode
      </label>
    </MyProviders>
  )
}

function MyProviders({ children, theme}) {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <ThemeContext.Provider value={theme}>
      <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
        {children}
      </CurrentUserContext.Provider>
    </ThemeContext.Provider>
  )
}

function WelcomePanel() {
  const {currentUser} = useContext(CurrentUserContext);

  return(
      <Panel title="welcome">
        {currentUser !== null ? <Greeting /> : <LoginForm />}
      </Panel>
  )
}

function Panel({title, children}) {
  const theme = useContext(ThemeContext);
  const classname = 'panel-' + theme;

  return (
    <div className={classname}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

function Greeting() {
  const {currentUser} = useContext(CurrentUserContext);

  return <p>You logged in as {currentUser.name}.</p>;
}

function LoginForm() {
  const theme = useContext(ThemeContext);
  const classname = 'button-' + theme;

  const {currentUser,setCurrentUser} = useContext(CurrentUserContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const canLogin = firstName.trim() !== '' && lastName.trim() !== '';

  if(currentUser !== null) {
    return <p>You logged in as {currentUser.name}.</p>;
  }

  return (
    <>
      <label>
        First name{': '}
        <input
          required
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last name{': '}
        <input
          required
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
      </label>
      <button
        className={classname}
        disabled={!canLogin}
        onClick={
          ()=>{
            setCurrentUser({name: firstName + ' ' + lastName})
          }
        }>login in</button>
      {!canLogin && <i>Fill in both fields.</i>}
    </>
  );
}