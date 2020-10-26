import React, { ReactElement } from 'react';
import { Quiz, QuizMap } from '../../api';
import QuizRow from '../QuizRow';
import { Container } from 'react-bootstrap';

interface QuizGridProps {

    quizzes: QuizMap;
}

function QuizGrid(props: QuizGridProps): ReactElement {

    const { quizzes } = props;
    
    return (
      <Container fluid>
          {Object.values(quizzes).map((quiz: Quiz) => (
            <QuizRow quiz={quiz} />
        ))}
      </Container>
    );
  }

  export default QuizGrid;