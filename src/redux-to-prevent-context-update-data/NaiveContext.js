// https://blog.axlight.com/posts/4-options-to-prevent-extra-rerenders-with-react-context/
import {
	createContext,
	useContext,
	useReducer,
	useRef,
	useEffect,
	Reducer,
	memo
} from "react"

const initialState = {
	firstName: 'Harry',
	familyName: 'Potter',
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'setFirstName':
			return { ...state, firstName: action.firstName };
		case 'setFamilyName':
			return { ...state, familyName: action.familyName };
		default:
			throw new Error('unexpected action type');
	}
};


const PersonContext = createContext([initialState, () => null]);

const PersonFirstName = () => {
	console.log("PersonFirstName")
	const [state, dispatch] = useContext(PersonContext);
	const renders = useRef(1);
	useEffect(() => {
		renders.current += 1;
	});
	return (
		<div>
			First Name:
			<input
				value={state.firstName}
				onChange={(event) => {
					dispatch({ type: 'setFirstName', firstName: event.target.value });
				}}
			/>
		(renders:{renders.current})
		</div>
	);
};

const PersonFamilyName = () => {
	console.log("PersonFamilyName")
	const [state, dispatch] = useContext(PersonContext);
	const renders = useRef(1);
	useEffect(() => {
		renders.current += 1;
	});
	return (
		<div>
			Family Name:
			<input
				value={state.familyName}
				onChange={(event) => {
					dispatch({ type: 'setFamilyName', familyName: event.target.value });
				}}
			/>
		(renders:{renders.current})
		</div>
	);
};

const NaiveContext = () => {
	const value = useReducer(reducer, initialState);
	return (
		<PersonContext.Provider value={value}>
			<PersonFirstName />
			<PersonFamilyName />
		</PersonContext.Provider>
	);
};

export default NaiveContext;