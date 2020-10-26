import React, { ReactElement } from 'react';
import { Quiz } from '../../api';
import { Row, Col } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import { QuizEdit } from '../../Containers';

interface QuizRowProps {
    quiz: Quiz;
}

function QuizRow(props: QuizRowProps): ReactElement {

    const { quiz } = props;

    return (
        <>
            <Row>
                <Col>{quiz.title}</Col>
                <Col>{quiz.intro}</Col>
                <Col><Link to={`/Quizzes/${quiz.id}`}>Edit</Link></Col>
            </Row>
            <Route path={`/Quizzes/:quizId`} component={QuizEdit}/>
        </>
    );
  }

  export default QuizRow;