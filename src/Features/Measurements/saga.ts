import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { actions as MeasurementsActions, ApiErrorAction } from './reducer';
import { PayloadAction } from '@reduxjs/toolkit';

function* apiErrorReceived(action: PayloadAction<ApiErrorAction>) {
  yield call(toast.error, `Error Received: ${action.payload.error}`);
}

export default function* watchApiError() {
  yield takeEvery(MeasurementsActions.measurementsApiErrorReceived.type, apiErrorReceived);
}
