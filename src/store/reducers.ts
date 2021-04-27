import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from '../Features/SelectMetrics/reducer'
import { reducer as measurementsReducer} from '../Features/Measurements/reducer'

const CombineReducers = {
  weather: weatherReducer,
  metrics: metricsReducer,
  measurements: measurementsReducer
};

export default CombineReducers;
