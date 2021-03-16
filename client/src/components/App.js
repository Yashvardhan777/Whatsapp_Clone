import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Login from './Login';
import Dashboard from './Dashboard';
import { ContactsProvider } from '../context/contactsProvider';
import { ConversationsProvider } from '../context/conversationsProvider';

function App() {
	const [id, setId] = useLocalStorage('id');

	const dashboard = (
		<ContactsProvider>
			<ConversationsProvider id={id}>
				<Dashboard id={id} />
			</ConversationsProvider>
		</ContactsProvider>
	)

	return (
		id ? dashboard : <Login onIdSubmit= {setId} />
	);
}

export default App;
