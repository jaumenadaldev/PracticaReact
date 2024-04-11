import { decrement, increment, resetCount } from './store/slices/counterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import styled from '@emotion/styled';

interface ButtonGroupProps {
  backgroundColor?: string;
}

const ButtonGroup = styled.div<ButtonGroupProps>(
  {
    display: 'flex',
    justifyContent: 'center',
    margin: '16px',
    padding: '8px',
  },
  props => ({
    backgroundColor: props.backgroundColor || '#f8f9fa',
  })
);

interface ButtonProps{
  value: number;
  backgroundColor?: string;
  color?: string;
  hoverColor?: string;
  disabledBackgroundColor?: string;
}

const Button = styled.button<ButtonProps>(
  {
    borderRadius: '5px',
    padding: '8px',
    margin: '0 5px',
    cursor: 'pointer',
  },
  props => ({
    backgroundColor: props.backgroundColor || '#f8f9fa',
    color: props.color || 'black',
    '&:hover:not(:disabled)': {
      backgroundColor: props.hoverColor || 'green',      
    },
    '&:disabled': {
      backgroundColor: props.disabledBackgroundColor || 'gray',
      cursor: 'not-allowed',
    }
  })
);

const Buttons = ({ value }: ButtonProps) => {

  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch();


  return (
    <>
        <ButtonGroup>
          <Button
          value={value} 
          type="button" 
          onClick={ () => dispatch(decrement(value))}
          disabled={count <= 0}
          >Previous</Button>
          <Button
          value={value}
          type="button" 
          onClick={ () => dispatch(resetCount())}
          >First Page</Button>
          <Button
          value={value} 
          type="button" 
          onClick={ () => dispatch(increment(value))}
          >Next Page</Button>
        </ButtonGroup>
    </>
  )
}

export default Buttons;