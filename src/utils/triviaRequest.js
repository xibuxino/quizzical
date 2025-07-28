const API_URL = 'https://opentdb.com/api.php?amount=';

export const triviaRequest = async (num, diff) => {
	const response = await fetch(
		`https://opentdb.com/api.php?amount=${num}&category=9&difficulty=${diff}&type=multiple`
	);
	if (!response.ok) throw new Error(`HTTP error ${response.status}`);
	const data = await response.json();

	return data;
};
