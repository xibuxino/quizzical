export const countCorrectAnswers = (questions) => {
	const ansNum = questions
		.map((q) => q.questionAnswerId === q.userAnswerId)
		.filter(Boolean).length;
	return ansNum;
};
