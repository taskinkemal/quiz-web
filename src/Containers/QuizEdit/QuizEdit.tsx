import React, { ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/types';
import { logoutAndResetApplication } from '../../redux/ducks/application';
import { match } from 'react-router';
import { Form, Col } from 'react-bootstrap';
import { TextBox, TextArea, Button, CheckBox, DateTimePicker } from '../../Controls';
import { Quiz } from '../../api';

interface RouteParams { quizId: string };

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & { match: match<RouteParams> };

  function QuizEdit(props: Props): ReactElement {

    let quizId = Number(props.match.params.quizId);
    let quiz = props.quizzes[quizId];

    const [title, setTitle] = useState(quiz.title);
    const [intro, setIntro] = useState(quiz.intro);
    const [timeConstraint, setTimeConstraint] = useState(quiz.timeConstraint);
    const [timeLimit, setTimeLimit] = useState(quiz.timeLimitInSeconds);
    const [shuffleQuestions, setShuffleQuestions] = useState(quiz.shuffleQuestions);
    const [shuffleOptions, setShuffleOptions] = useState(quiz.shuffleOptions);
    const [hasPassScore, setHasPassScore] = useState(quiz.passScore !== undefined);
    const [passScore, setPassScore] = useState(quiz.passScore);
    const [repeatable, setRepeatable] = useState(quiz.repeatable);
    const [showResults, setShowResults] = useState(quiz.showResults);
    const [availableFrom, setAvailableFrom] = useState(quiz.availableFrom);
    const [availableTo, setAvailableTo] = useState(quiz.availableTo);

    const handleSave = (): void => {
      
      let updatedQuiz: Quiz = {
        id: quiz.id,
        quizIdentityId: quiz.quizIdentityId,
        version: quiz.version,
        status: quiz.status,
        title: title,
        intro: intro,
        timeConstraint: timeConstraint,
        timeLimitInSeconds: timeLimit,
        shuffleQuestions: shuffleQuestions,
        shuffleOptions: shuffleOptions,
        passScore: passScore,
        repeatable: repeatable,
        showResults: showResults,
        availableFrom: availableFrom,
        availableTo: availableTo
      };

      console.log(updatedQuiz);
    };

    return (
        <Form>
          <Form.Group>
            <Form.Label>Quiz Title</Form.Label>
            <TextBox
              placeholder="Title"
              value={title}
              onChange={setTitle}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Quiz Intro</Form.Label>
            <TextArea
              placeholder="Intro"
              rows={5}
              value={intro}
              onChange={setIntro}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>
                <CheckBox
                  label="Has Time Constraint"
                  isChecked={timeConstraint}
                  onChange={setTimeConstraint}
                />
              </Form.Label>
              <TextBox
                placeholder="Time Limit in seconds"
                value={timeLimit.toString()}
                isDisabled={!timeConstraint}
                onChange={value => setTimeLimit(Number(value ? value : "0"))}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>
                <CheckBox
                  label="Has Pass Score"
                  isChecked={hasPassScore}
                  onChange={value => {
                      setHasPassScore(value);
                      setPassScore(value ? 50 : undefined);
                    }
                  }
                />
              </Form.Label>
              <TextBox
                placeholder="Pass Score"
                value={passScore ? passScore.toString() : ""}
                isDisabled={!hasPassScore}
                onChange={value => setPassScore(Number(value ? value : "0"))}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <CheckBox
                label="Shuffle Questions"
                isChecked={shuffleQuestions}
                onChange={setShuffleQuestions}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <CheckBox
                label="Shuffle Options"
                isChecked={shuffleOptions}
                onChange={setShuffleOptions}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <CheckBox
              label="Repeatable"
              isChecked={repeatable}
              onChange={setRepeatable}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Show Results on</Form.Label>
            <DateTimePicker
              showTimeSelect
              value={showResults ? new Date(showResults) : null}
              onChange={setShowResults}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Available from</Form.Label>
              <DateTimePicker
                showTimeSelect
                value={availableFrom ? new Date(availableFrom) : null}
                onChange={setAvailableFrom}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Available to</Form.Label>
              <DateTimePicker
                showTimeSelect
                value={availableTo ? new Date(availableTo) : null}
                onChange={setAvailableTo}
              />
            </Form.Group>
          </Form.Row>
          
          <Button
            value="Save"
            onClick={handleSave}
          />
        </Form>
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