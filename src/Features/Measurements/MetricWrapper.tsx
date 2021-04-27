import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../store';
import MeasurementCard from './MeasurementCard';
import { MetricQuery as query } from '../../quries'
import Grid from '@material-ui/core/Grid';
import Chart from '../../components/Chart';
import { Provider, useQuery } from 'urql';
import { actions, SelectedMetric } from './reducer';
import { client } from '../Weather/Weather';

const MetricWrraper = () => {
  return (
    <Provider value={client}>
      <MetricDetails />
    </Provider>
  );
};

const MetricDetails = () => {
  const dispatch = useDispatch();
  const { selectedMetrics } = useSelector((state: IState) => state.metrics);

  const now = new Date();
  now.setMinutes(now.getMinutes() - 30);
  const [currentTime] = useState(now);

  const [result] = useQuery({
    query,
    variables: {
      input: selectedMetrics.map((selectedMetric: SelectedMetric) => {
        return {
          metricName: selectedMetric.value,
          after: currentTime.getTime(),
        };
      }),
    },
  });
  const { data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.measurementsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMultipleMeasurements } = data;
    if (getMultipleMeasurements) {
      dispatch(actions.measurementsDataReceived(getMultipleMeasurements));
    }
  }, [dispatch, data, error, selectedMetrics]);

  return (
    <Grid container spacing={3}>
      {selectedMetrics.map((selectedMetric: SelectedMetric, index: number) => (
        <Grid item xs={3} key={index}>
          <MeasurementCard selectedMetric={selectedMetric} />
        </Grid>
      ))}
      <Grid item xs={12}>
        {selectedMetrics.length > 0 ? <Chart /> : null}
      </Grid>
    </Grid>
  );
};

export default MetricWrraper;
