export const QuestionText = ({ questionId, questionText }) => {
	return (
		<h2 className='question'>
			<span className='question-number'>{questionId + 1}</span>
			<span className='question-text'>{questionText}</span>
		</h2>
	);
};
