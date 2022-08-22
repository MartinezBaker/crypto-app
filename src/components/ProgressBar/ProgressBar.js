import { Progress } from './styles'

const ProgressBar = ({progress, width, height}) => {
  return <Progress value={progress?.toString()} max="100" width={width} height={height}/>;
};

export default ProgressBar;