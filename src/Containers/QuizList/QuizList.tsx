import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/types';
import { QuizGrid } from '../../Components';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

  function QuizList(props: Props): ReactElement {

    return (
        <div>
            <QuizGrid quizzes={props.quizzes} />
        </div>
    );
  }

  const mapDispatchToProps = (dispatch: any) => ({
  });
  
  const mapStateToProps = (state: AppState) => {
    const { application, session } = state;
    const { user, quiz } = session;
    return {
      isInitialized: application.initialized,
      user: user,
      quizzes: quiz
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(QuizList);