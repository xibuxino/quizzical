export const QuestionOption = ({
	isFinished,
	index,
	option,
	questionAnswerId,
	userAnswerId,
}) => {
	return (
		<button
			disabled={isFinished}
			key={index}
			data-id={index}
			value={option}
			className={`answer ${index === questionAnswerId ? 'correct' : ''} ${
				isFinished &&
				userAnswerId === index &&
				userAnswerId !== questionAnswerId
					? 'incorrect'
					: ''
			}
				${userAnswerId === index ? 'selected' : ''}`}
			type='button'>
			{option}
		</button>
	);
};
