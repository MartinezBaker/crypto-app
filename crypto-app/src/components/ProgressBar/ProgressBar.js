import { Progress } from './styles'

const ProgressBar = ({progress, width}) => {
  return <Progress value={progress} max="100" width={width}/>;
};

export default ProgressBar;