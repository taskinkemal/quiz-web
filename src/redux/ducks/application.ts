/* ******************************************************************************************************************
 *
 * GE CONFIDENTIAL
 *
 * Copyright (c) 2020 by General Electric Company. All Rights Reserved.
 *
 * NOTICE:  All information contained herein is confidential and proprietary to GE and/or its suppliers.
 * The intellectual and technical concepts contained herein may be covered by one or more U.S. and foreign patents,
 * and are protected by trade secret and/or copyright law. Dissemination or reproduction of this
 * information outside GE is strictly forbidden unless prior written permission is obtained from an authorized
 * representative of GE, or is in accordance with the terms and conditions contained in the written agreement
 * pursuant to which this information was supplied by GE.
 *
 ******************************************************************************************************************* */

import { AsyncAction, Action } from '../types';
import {
  deleteAccessToken,
  receiveAccessToken,
  requestAccessToken,
  requestAccessTokenDeletion,
  requestAccessTokenValidation
} from './session/token';

import { serviceEndpoint } from '../../api/configuration';
import LocalStorage from '../../api/LocalStorage';

// Actions
export const RESET_APPLICATION_STATE = 'api/application/RESET_APPLICATION_STATE';
const SET_APPLICATION_INITIALIZED = 'api/application/SET_APPLICATION_INITIALIZED';

export type ApplicationAction =
  | Action<typeof RESET_APPLICATION_STATE>
  | Action<typeof SET_APPLICATION_INITIALIZED, boolean>;

interface State {
  initialized: boolean;
  apiEndpoint: string;
}

// Reducer
const initialState: State = {
  initialized: false,
  apiEndpoint: serviceEndpoint || ''
};

export default function reducer(state: State = initialState, action: ApplicationAction): State {
  switch (action.type) {
    case SET_APPLICATION_INITIALIZED:
      return {
        ...state,
        initialized: action.payload
      };
    default:
      return state;
  }
}

// Action Creators
export function resetState(): ApplicationAction {
  return {
    type: RESET_APPLICATION_STATE,
    payload: undefined
  };
}

export function setInitialized(initialized: boolean): ApplicationAction {
  return {
    type: SET_APPLICATION_INITIALIZED,
    payload: initialized
  };
}

export function login(email: string, password: string, rememberMe: boolean): AsyncAction<any> {
  return async (dispatch) => {
    try {
      const accessToken = await dispatch(requestAccessToken(email, password, "web", rememberMe));
      LocalStorage.saveAccessToken(accessToken ? accessToken : '');
      return dispatch(initApplication());
    } catch (error) {
      //return dispatch(throwLoginError({ userName: userCode, error }));
    }
  };
}

export function logoutAndResetApplication(): AsyncAction {
  const localSettings = LocalStorage.load();

  return (dispatch) => {
    return dispatch(requestAccessTokenDeletion(localSettings.accessToken ? localSettings.accessToken : ''))
      .then(() => LocalStorage.reset())
      .then(() => dispatch(reInitApplication()));
  };
}

export function initApplication(): AsyncAction<any> {
  return (dispatch) => {
    dispatch(setInitialized(false));
    return dispatch(reInitApplication());
  };
}

export function reInitApplication(): AsyncAction {
  const localSettings = LocalStorage.load();

  return (dispatch, getState) => {
    dispatch(setInitialized(false));
    return dispatch(requestAccessTokenValidation(localSettings.accessToken ? localSettings.accessToken : ''))
      .then((accessTokenIsValid: boolean) => {
        if (accessTokenIsValid) {
          dispatch(receiveAccessToken(localSettings.accessToken!));
        } else {
          throw new Error('The access token is invalid or expired.');
        }
      })
      /*.then(() => dispatch(requestUser()))
      .then(async () => {
        const { user } = getState().session;
      })*/
      .catch(() => {
        LocalStorage.reset();
        dispatch(resetState());
        dispatch(deleteAccessToken());
      })
      .finally(async () => {
        try {
          // any errors here are indicators to a connectivity error.
        } catch (error) {
          //await dispatch(throwGlobalError(GlobalErrorType.HttpError));
        } finally {
          await dispatch(setInitialized(true));
        }
      });
  };
}