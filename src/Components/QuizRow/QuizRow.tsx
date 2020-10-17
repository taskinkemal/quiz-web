import React, { ReactElement } from 'react';
import { Quiz } from '../../api';

interface QuizRowProps {
    quiz: Quiz;
}

function QuizRow(props: QuizRowProps): ReactElement {

    const { quiz } = props;

    return (
        <div>
            <span>{quiz.title}</span>
            <span>{quiz.intro}</span>
        </div>
    );
  }

  export default QuizRow;