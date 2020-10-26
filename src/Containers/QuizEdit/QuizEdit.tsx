import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/types';
import { match } from 'react-router';
import { Quiz } from '../../api';
import { saveQuiz } from '../../redux/ducks/session/quiz';
import QuizEditForm from './QuizEditForm';

interface RouteParams { quizId: string };

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & { match: match<RouteParams> };

  function QuizEdit(props: Props): ReactElement {

    let quizId = Number(props.match.params.quizId);
    let quiz = props.quizzes[quizId];

    return (
        <QuizEditForm quiz={quiz} onSave={props.saveQuiz} />
    );
  }

  const mapDispatchToProps = (dispatch: any) => ({
    saveQuiz: (quiz: Quiz) => {
        return dispatch(saveQuiz(quiz));
      }
  });
  
  const mapStateToProps = (state: AppState) => {
    const { session } = state;
    const { quiz } = session;
    return {
      quizzes: quiz
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(QuizEdit);