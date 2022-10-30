import data from "./data"

export const completedQuestions = new Set([
     "Contains Duplicate"
])

export const randomQuestion = (filters?: Set<string>): unknown => {
     const filterSet = filters ?? new Set(["Hard"]);
     const questionBank = data.filter((data) => !(filterSet.has(data.difficulty) && !(completedQuestions.has(data.problem))));
     const randomIndex = Math.floor(Math.random() * (questionBank.length - 1));
     return questionBank[randomIndex]
}