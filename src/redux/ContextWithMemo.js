import {
	createContext,
	useContext,
	useReducer,
	useRef,
	useEffect,
	memo,
	React
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

const InnerPersonFirstName = memo(({ firstName, dispatch }) => {
	const renders = useRef(1);
	useEffect(() => {
		renders.current += 1;
	});
	return (
		<div>
			First Name:
			<input
				value={firstName}
				onChange={(event) => {
					dispatch({ type: 'setFirstName', firstName: event.target.value });
				}}
			/>
		(renders:{renders.current})
		</div>
	);
});

const PersonFirstName = () => {
	useEffect(() => {
		console.log("PersonFirstName")
	})
	const [state, dispatch] = useContext(PersonContext);
	return <InnerPersonFirstName firstName={state.firstName} dispatch={dispatch} />;
};

const InnerPersonFamilyName = memo(({ familyName, dispatch }) => {
	const renders = useRef(1);
	useEffect(() => {
		renders.current += 1;
	});
	return (
		<div>
			Family Name:
			<input
				value={familyName}
				onChange={(event) => {
					dispatch({ type: 'setFamilyName', familyName: event.target.value });
				}}
			/>
		(renders:{renders.current})
		</div>
	);
});

const PersonFamilyName = () => {
	useEffect(() => {
		console.log("PersonFamilyName")
	})
	const [state, dispatch] = useContext(PersonContext);
	return <InnerPersonFamilyName familyName={state.familyName} dispatch={dispatch} />;
};

const ContextWithMemo = () => {
	const value = useReducer(reducer, initialState);
	return (
		<PersonContext.Provider value={value}>
			<PersonFirstName />
			<PersonFamilyName />
		</PersonContext.Provider>
	);
};

export default ContextWithMemo;