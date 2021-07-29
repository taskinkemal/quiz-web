import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/types';
import { match } from 'react-router';
import { Question } from '../../api';
import { saveQuestion } from '../../redux/ducks/session/question';
import QuestionEditForm from './QuestionEditForm';

interface RouteParams { quizId: string, questionId: string };

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & { match: match<RouteParams> };

  function QuestionEdit(props: Props): ReactElement {

    let quizId = Number(props.match.params.quizId);
    let questionId = Number(props.match.params.questionId);
    let question = props.questions[quizId][questionId];

    return (
        <QuestionEditForm question={question} quizId={quizId} onSave={props.saveQuestion} />
    );
  }

  const mapDispatchToProps = (dispatch: any) => ({
    saveQuestion: (quizId: number, question: Question) => {
        return dispatch(saveQuestion(quizId, question));
      }
  });
  
  const mapStateToProps = (state: AppState) => {
    const { session } = state;
    const { question } = session;
    return {
      questions: question
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(QuestionEdit);