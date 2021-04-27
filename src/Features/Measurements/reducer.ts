import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

export type ApiErrorAction = {
  error: string;
};

interface SelectedMeasurement {
  measurement: Measurement;
  selectedMetric: SelectedMetric;
};

export interface Measurements {
  measurements: [Measurement];
};

export interface SelectedMetric {
  value: string;
  label: string;
};

export interface Measurement {
  value: number;
  metric: string;
  at: number;
  unit: string;
};

export interface IData {
  metric: string;
  measurements: [Measurement];
};

interface MeasurementsState {
  measurements: IData[]
}

const initialState: MeasurementsState = {
  measurements: [],
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    measurementsDataReceived: (state, action: PayloadAction<[IData]>) => {
      state.measurements = action.payload;
    },
    measurementsApiErrorReceived: (state, _action: PayloadAction<ApiErrorAction>) => state,
    subscribedMeasurementDataReceived: (state, action: PayloadAction<SelectedMeasurement>) => {
      const { measurement, selectedMetric } = action.payload;
      let selectedMeasurement = _.find(state.measurements, { metric: selectedMetric.value });
      if (selectedMeasurement) {
        selectedMeasurement.measurements.push(measurement);
        state.measurements.map(_measurement => selectedMeasurement);
      }
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
