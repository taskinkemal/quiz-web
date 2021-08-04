import React, { ChangeEvent, ReactElement, useState } from 'react';
import { Form, ButtonGroup, ToggleButton, Container } from 'react-bootstrap';
import Select from 'react-select';
import { TextArea, Button } from '../../Controls';
import { Question, OptionMap, Option } from '../../api';

interface QuestionEditFormProps {
    question: Question,
    options: OptionMap,
    quizId: number,
    onSave: (quizId: number, q: Question) => void;
};

interface LevelOption { value: string, label: string, color: string } 

function QuestionEditForm(props: QuestionEditFormProps): ReactElement {

    const { question, options, quizId, onSave } = props;

    const [body, setBody] = useState(question.body);
    const [level, setLevel] = useState(question.level);
    const [questionType, setQuestionType] = useState(question.type);

    const levelOptions : ReadonlyArray<LevelOption> = [
      { value: '1', label: 'Very easy', color: '#008000' },
      { value: '2', label: 'Easy', color: '#FFC300' },
      { value: '3', label: 'Moderate', color: '#FF5733' },
      { value: '4', label: 'Difficult', color: '#C70039' },
      { value: '5', label: 'Very difficult', color: '#900C3F' }
    ]

    const dot = (color = '#ccc') => ({
      alignItems: 'center',
      display: 'flex',
    
      ':before': {
        backgroundColor: color,
        borderRadius: 10,
        content: '" "',
        display: 'block',
        marginRight: 8,
        height: 10,
        width: 10,
      },
    });

    const colourStyles = {
      control: (styles: any) => ({ ...styles, backgroundColor: 'white' }),
      option: (styles: { [x: string]: any; }, { data, isSelected }: any) => {
        return {
          ...styles,
          backgroundColor: isSelected
            ? '#f5f5f5'
            : '#fff',
          color: data.color,
          cursor: 'default',
    
          ':active': {
            ...styles[':active'],
            backgroundColor: '#f5f5f5',
          },
        };
      },
      input: (styles: any) => ({ ...styles, ...dot() }),
      placeholder: (styles: any) => ({ ...styles, ...dot() }),
      singleValue: (styles: any, { data }: any) => ({ ...styles, ...dot(data.color) }),
    };

    const onLevelChange = (value: LevelOption | null) => {

      if (value !== null) {
        setLevel(Number(value.value));
      }
    }

    const onQuestionTypeChange = (e: ChangeEvent<HTMLInputElement>) => {

      if (e.currentTarget.value === "MultiSelect") {
        setQuestionType("MultiSelect");
      } else if (e.currentTarget.value === "MultiSelectMultiOptions") {
        setQuestionType("MultiSelectMultiOptions");
      }
    }

    const handleSave = (): void => {
      
      let updatedQuestion: Question = {
        id: question.id,
        body: body,
        level: level,
        type: question.type,
        optionIds: question.optionIds
      };

      onSave(quizId, updatedQuestion);
    };

    return (
        <Form>

          <Form.Group>
            <Form.Label>Question Body</Form.Label>
            <TextArea
              placeholder="Body"
              rows={5}
              value={body}
              onChange={setBody}
            />
            <Select
              options={levelOptions}
              styles={colourStyles}
              defaultValue={levelOptions[level-1]}
              onChange={onLevelChange}/>
            <ButtonGroup className="mb-2">
              <ToggleButton
                  type="radio"
                  variant="secondary"
                  name="radio"
                  value="MultiSelect"
                  checked={questionType === "MultiSelect"}
                  onChange={onQuestionTypeChange}
                >
                Multi Select
              </ToggleButton>
              <ToggleButton
                  type="radio"
                  variant="secondary"
                  name="radio"
                  value="MultiSelectMultiOptions"
                  checked={questionType === "MultiSelectMultiOptions"}
                  onChange={onQuestionTypeChange}
                >
                Multi Select - Multi Options
              </ToggleButton>
          </ButtonGroup>
          <Container fluid>
              {Object.values(options).map((option: Option) => (
                option.body
            ))}
          </Container>
          </Form.Group>
          
          <Button
            value="Save"
            onClick={handleSave}
          />
        </Form>
    );
  }
  
  export default QuestionEditForm;