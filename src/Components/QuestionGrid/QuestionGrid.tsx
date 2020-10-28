import React, { ReactElement, useEffect, useState } from 'react';
import { QuestionMap, Question } from '../../api';
import QuestionRow from '../QuestionRow';
import { Container } from 'react-bootstrap';

interface QuestionGridProps {

    quizId: number,
    getQuestionsAction: (quizId: number) => Promise<QuestionMap>;
}

function QuestionGrid(props: QuestionGridProps): ReactElement {

    const { quizId, getQuestionsAction } = props;

    var initialQuestions: QuestionMap = {};
    const [ questions, setQuestions ] = useState(initialQuestions);

    useEffect(() => {
        getQuestionsAction(quizId).then(response => setQuestions(response));
    }, [quizId, getQuestionsAction]);
    
    return (
      <Container fluid>
          {Object.values(questions).map((question: Question) => (
            <QuestionRow quizId={quizId} question={question} key={question.id} />
        ))}
      </Container>
    );
  }

  export default QuestionGrid;