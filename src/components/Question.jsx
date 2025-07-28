import { QuestionOption } from './QuestionOption';
import { QuestionText } from './QuestionText';

export const Question = ({
	questionOptions,
	isFinished,
	questionAnswerId,
	userAnswerId,
	questionText,
	setAnswer,
	questionId,
}) => {
	const options = questionOptions.map((option, index) => {
		return (
			<QuestionOption
				key={index}
				isFinished={isFinished}
				index={index}
				option={option}
				questionAnswerId={questionAnswerId}
				userAnswerId={userAnswerId}
			/>
		);
	});

	return (
		<div className='question-box' data-id={questionId}>
			<QuestionText questionId={questionId} questionText={questionText} />
			<div className='answer-box' onClick={setAnswer}>
				{options}
			</div>
		</div>
	);
};
