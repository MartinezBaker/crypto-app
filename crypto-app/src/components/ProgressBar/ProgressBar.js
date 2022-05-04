import { Progress } from './styles'

const ProgressBar = ({progress, width}) => {
  return <Progress value={progress.toString()} max="100" width={width}/>;
};

export default ProgressBar;