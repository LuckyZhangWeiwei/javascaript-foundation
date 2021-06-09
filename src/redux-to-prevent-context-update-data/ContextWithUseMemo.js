import React, {
	createContext,
	useContext,
	useReducer,
	useRef,
	useMemo,
	useEffect,
} from 'react';

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

// const PersonFirstName = () => {
// 	const [state, dispatch] = useContext(PersonContext);
// 	const { firstName } = state;
// 	const renders = useRef(1);
// 	useEffect(() => {
// 		renders.current += 1; // XXX side effect
// 	})

// 	return useMemo(() => {
// 		console.log(renders.current)

// 		return (
// 			<div>
// 				First Name:
// 				<input
// 					value={firstName}
// 					onChange={(event) => {
// 						dispatch({ type: 'setFirstName', firstName: event.target.value });
// 					}}
// 				/>
// 		  (renders:{renders.current})
// 			</div>
// 		);
// 	}, [firstName]);
// };

const PersonFamilyName = () => {
	const [state, dispatch] = useContext(PersonContext);
	const { familyName } = state;
	const renders = useRef(1);

	return useMemo(() => {
		renders.current += 1; // XXX side effect
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
	}, [familyName]);
};

const ContextWithUseMemo = () => {
	const value = useReducer(reducer, initialState);
	return (
		<PersonContext.Provider value={value}>
			{/* <PersonFirstName /> */}
			<PersonFamilyName />
		</PersonContext.Provider>
	);
};

export default ContextWithUseMemo;