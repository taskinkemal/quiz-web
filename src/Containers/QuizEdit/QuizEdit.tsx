import React, { ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/types';
import { logoutAndResetApplication } from '../../redux/ducks/application';
import { match } from 'react-router';
import { TextBox, TextArea, Button } from '../../Controls';

interface RouteParams { quizId: string };

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & { match: match<RouteParams> };

  function QuizEdit(props: Props): ReactElement {

    let quizId = Number(props.match.params.quizId);
    let quiz = props.quizzes[quizId];

    const [title, setTitle] = useState(quiz.title);
    const [intro, setIntro] = useState(quiz.intro);

    const handleSave = (): void => {
      console.log(title);
  };

    return (
        <div>
          <span>Quiz Title</span>
          <TextBox
            placeholder="Title"
            value={title}
            onChange={setTitle}
          />

          <span>Quiz Intro</span>
          <TextArea
            placeholder="Intro"
            rows={5}
            value={intro}
            onChange={setIntro}
          />
          
          <Button
            value="Save"
            onClick={handleSave}
          />
        </div>
    );
  }

  const mapDispatchToProps = (dispatch: any) => ({
    logout: () => {
        return dispatch(logoutAndResetApplication());
      }
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(QuizEdit);