import React, { ReactElement, useEffect, useState  } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/types';
import { match } from 'react-router';
import { Question, OptionMap } from '../../api';
import { saveQuestion } from '../../redux/ducks/session/question';
import { requestOptions } from '../../redux/ducks/session/option';
import QuestionEditForm from './QuestionEditForm';

interface RouteParams { quizId: string, questionId: string };

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & { match: match<RouteParams> };

  function QuestionEdit(props: Props): ReactElement {

    let quizId = Number(props.match.params.quizId);
    let questionId = Number(props.match.params.questionId);
    let question = props.questions[quizId][questionId];
    let getOptionsAction = props.getOptionsAction;

    var initialOptions: OptionMap = {};
    const [ options, setOptions ] = useState(initialOptions);

    useEffect(() => {
      getOptionsAction(quizId, questionId).then(response => setOptions(response));
    }, [quizId, questionId, getOptionsAction]);

    return (
        <QuestionEditForm question={question} options={options} quizId={quizId} onSave={props.saveQuestion} />
    );
  }

  const mapDispatchToProps = (dispatch: any) => ({
    saveQuestion: (quizId: number, question: Question) => {
        return dispatch(saveQuestion(quizId, question));
      },
    getOptionsAction: (quizId: number, questionId: number): Promise<OptionMap> => { return dispatch(requestOptions(quizId, questionId)); }
  });
  
  const mapStateToProps = (state: AppState) => {
    const { session } = state;
    const { question, option } = session;
    return {
      questions: question,
      options: option
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(QuestionEdit);