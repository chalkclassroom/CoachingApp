import * as Types from '../../constants/Types';

export const ADD_CLIMATE_SUMMARY = "add_climate_summary";
export const ADD_CLIMATE_DETAILS = "add_climate_details";
export const ADD_CLIMATE_TRENDS = "add_climate_trends";

export const addClimateSummary = (entry: {
  sessionId: string,
  teacherId: string,
  summary: Types.ClimateData['summary'] | undefined
}): AddClimateSummary => ({
  type: ADD_CLIMATE_SUMMARY,
  entry
});

export const addClimateDetails = (entry: {
  sessionId: string,
  teacherId: string,
  details: Array<Types.ClimateData['details']> | undefined
}): AddClimateDetails => ({
  type: ADD_CLIMATE_DETAILS,
  entry
});

export const addClimateTrends = (entry: {
  teacherId: string,
  trends: Types.ClimateData['trends'] | undefined
}): AddClimateTrends => ({
  type: ADD_CLIMATE_TRENDS,
  entry
});

interface AddClimateSummary {
  type: typeof ADD_CLIMATE_SUMMARY,
  entry: {
    sessionId: string,
    teacherId: string,
    summary: Types.ClimateData['summary'] | undefined
  }
}

interface AddClimateDetails {
  type: typeof ADD_CLIMATE_DETAILS,
  entry: {
    sessionId: string,
    teacherId: string,
    details: Array<Types.ClimateData['details']> | undefined
  }
}

interface AddClimateTrends {
  type: typeof ADD_CLIMATE_TRENDS,
  entry: {
    teacherId: string,
    trends: Types.ClimateData['trends'] | undefined
  }
}

export type ResultsTypes =
  AddClimateSummary |
  AddClimateDetails |
  AddClimateTrends