import styled from 'styled-components/native';

interface Props {
  lastOne?: boolean;
}
export const TextInput = styled.TextInput<Props>`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 15px 7px;
  border-radius: 4px;
  color: white;
  margin-bottom: ${(props) => (props.lastOne ? '15' : 8)}px;
`;
