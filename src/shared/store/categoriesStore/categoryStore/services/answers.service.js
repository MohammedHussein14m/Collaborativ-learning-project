import { apiRequests } from "../../../../services/apiRequests";

const AnswersService = {
  // get answers for a specific question
  getAnswers: questionId =>
    apiRequests.AnswerApiRequests.getAnswers(questionId),
  // add answer
  addAnswer: (answerData) =>
    apiRequests.AnswerApiRequests.addAnswer(answerData)
};
export default AnswersService;
