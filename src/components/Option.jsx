export const Option = (props) => {
	return (
		<button
			data-id={props.id}
			className={
				props.userAnswerId === props.id
					? 'answer answer-one selected'
					: 'answer answer-one'
			}
			type='button'>
			{props.questionOption}
		</button>
	);
};
