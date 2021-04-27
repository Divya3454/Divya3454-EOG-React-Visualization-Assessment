import { spawn } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import metricsSaga from '../Features/SelectMetrics/saga';
import measurementsSaga from '../Features/Measurements/saga';

export default function* root() {
  yield spawn(weatherSaga)
  yield spawn(metricsSaga)
  yield spawn(measurementsSaga)
}
