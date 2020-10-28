import token from './token';
import users from './users';
import quizzes from './quizzes';
import questions from './questions';

function unauthorized(url: string) {
  return {
    token: token(url)
  };
}


function authorized(url: string, accessToken: string) {
  return {
    ...unauthorized(url),
    users: users(url, accessToken),
    quizzes: quizzes(url, accessToken),
    questions: questions(url, accessToken)
  };
}

function endpoints() {
  return {
    unauthorized,
    authorized
  };
}

export default endpoints();
