const API_URL = 'https://opentdb.com/api.php?amount=';

export default async function getQuestions(num) {
	const response = await fetch(`https://opentdb.com/api.php?amount=${num}`);
	const data = await response.json();

	return data;
}
