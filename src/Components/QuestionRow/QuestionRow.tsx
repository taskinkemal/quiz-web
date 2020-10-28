import React, { ReactElement } from 'react';
import { Question } from '../../api';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface QuestionRowProps {
    quizId: number;
    question: Question
}

function QuestionRow(props: QuestionRowProps): ReactElement {

    const { quizId, question } = props;

    return (
        <>
            <Row>
                <Col>{question.body}</Col>
                <Col>{question.level}</Col>
                <Col><Link to={`/Quizzes/${quizId}/Questions/${question.id}`}>Edit</Link></Col>
            </Row>
        </>
    );
  }

  export default QuestionRow;