import React, { ReactElement } from 'react';
import { Quiz, QuizMap } from '../../api';
import QuizRow from '../QuizRow';

interface QuizGridProps {

    quizzes: QuizMap;
}

function QuizGrid(props: QuizGridProps): ReactElement {

    const { quizzes } = props;
    
    return (
        <div>
          {Object.values(quizzes).map((quiz: Quiz) => (
            <QuizRow quiz={quiz} />
        ))}
        </div>
    );
  }

  export default QuizGrid;