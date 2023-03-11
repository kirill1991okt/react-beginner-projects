import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [invited, setInvited] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [stateInvited, setStateInvited] = React.useState(true);

  const onClickToInvited = (id) => {
    if (invited.includes(id)) {
      setInvited((prev) => prev.filter((numInArr) => numInArr !== id));
    } else {
      setInvited((prev) => [...prev, id]);
    }
  };

  const onSendInvite = () => {
    setStateInvited(false);
  };

  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch((err) => {
        console.log(err);
        alert(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="App">
      {stateInvited ? (
        <Users
          items={users}
          isLoading={isLoading}
          invited={invited}
          onClickToInvited={onClickToInvited}
          onSendInvite={onSendInvite}
        />
      ) : (
        <Success count={invited.length} />
      )}
    </div>
  );
}

export default App;
