import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedMetric } from '../Measurements/reducer';

export type ApiErrorAction = {
  error: string;
};

interface SelectMetricsState {
  metrics: string[];
  selectedMetrics: SelectedMetric[];
}

const initialState: SelectMetricsState = {
  metrics: [],
  selectedMetrics: [],
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricsDataRecevied: (state, action: PayloadAction<[string]>) => {
      state.metrics = action.payload;
    },
    metricsApiErrorReceived: (state, _action: PayloadAction<ApiErrorAction>) => state,
    metricsSelected: (state, action: PayloadAction<[SelectedMetric]>) => {
      const payload = action.payload;
      const checkNull = payload === null ? [] : payload;
      state.selectedMetrics = checkNull;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
