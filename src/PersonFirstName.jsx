const PersonFirstName = () => {
	const [state, dispatch] = useContext(PersonContext);
	return (
		<div>
			First Name:
			<input
				value={state.firstName}
				onChange={(event) => {
					dispatch({ type: 'setFirstName', firstName: event.target.value });
				}}
			/>
		</div>
	);
};

export default PersonFirstName