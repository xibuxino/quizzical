import { decodeHtml } from './decodeHtml';

export const convertQuestions = (results) => {
	function randomAnswerId(length) {
		return Math.floor(Math.random() * length);
	}
	return results.map((item, index) => {
		const questionAnswerId = randomAnswerId(item.incorrect_answers.length + 1);
		const questionOptions = [
			...item.incorrect_answers.slice(0, questionAnswerId).map(decodeHtml),
			decodeHtml(item.correct_answer),
			...item.incorrect_answers.slice(questionAnswerId).map(decodeHtml),
		];
		return {
			questionId: index,
			questionText: decodeHtml(item.question),
			questionAnswerId: questionAnswerId,
			questionOptions: questionOptions,
			userAnswerId: null,
		};
	});
};
