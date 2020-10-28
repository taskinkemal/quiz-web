import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/types';
import { match } from 'react-router';
import { QuestionGrid } from '../../Components';
import { requestQuestions } from '../../redux/ducks/session/question';
import { QuestionMap } from '../../api';

interface RouteParams { quizId: string };

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & { match: match<RouteParams> };

  function QuizQuestions(props: Props): ReactElement {

    let quizId = Number(props.match.params.quizId);

    return (
        <QuestionGrid getQuestionsAction={props.getQuestionsAction} quizId={quizId} />
    );
  }

  const mapDispatchToProps = (dispatch: any) => ({
    getQuestionsAction: (quizId: number): Promise<QuestionMap> => { return dispatch(requestQuestions(quizId)); }
  });
  
  const mapStateToProps = (state: AppState) => {
    const { session } = state;
    return {
      session: session
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(QuizQuestions);