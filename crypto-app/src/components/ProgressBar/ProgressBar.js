import { Progress } from './styles'

const ProgressBar = (props) => {
  return <Progress value={props.progress} max="100" />;
};

export default ProgressBar;