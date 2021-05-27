import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPracticeSession, defaultValue } from 'app/shared/model/practice-session.model';

export const ACTION_TYPES = {
  FETCH_PRACTICESESSION_LIST: 'practiceSession/FETCH_PRACTICESESSION_LIST',
  FETCH_PRACTICESESSION: 'practiceSession/FETCH_PRACTICESESSION',
  CREATE_PRACTICESESSION: 'practiceSession/CREATE_PRACTICESESSION',
  UPDATE_PRACTICESESSION: 'practiceSession/UPDATE_PRACTICESESSION',
  PARTIAL_UPDATE_PRACTICESESSION: 'practiceSession/PARTIAL_UPDATE_PRACTICESESSION',
  DELETE_PRACTICESESSION: 'practiceSession/DELETE_PRACTICESESSION',
  RESET: 'practiceSession/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPracticeSession>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type PracticeSessionState = Readonly<typeof initialState>;

// Reducer

export default (state: PracticeSessionState = initialState, action): PracticeSessionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRACTICESESSION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRACTICESESSION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PRACTICESESSION):
    case REQUEST(ACTION_TYPES.UPDATE_PRACTICESESSION):
    case REQUEST(ACTION_TYPES.DELETE_PRACTICESESSION):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_PRACTICESESSION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PRACTICESESSION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRACTICESESSION):
    case FAILURE(ACTION_TYPES.CREATE_PRACTICESESSION):
    case FAILURE(ACTION_TYPES.UPDATE_PRACTICESESSION):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_PRACTICESESSION):
    case FAILURE(ACTION_TYPES.DELETE_PRACTICESESSION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRACTICESESSION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRACTICESESSION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRACTICESESSION):
    case SUCCESS(ACTION_TYPES.UPDATE_PRACTICESESSION):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_PRACTICESESSION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRACTICESESSION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/practice-sessions';

// Actions

export const getEntities: ICrudGetAllAction<IPracticeSession> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PRACTICESESSION_LIST,
    payload: axios.get<IPracticeSession>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IPracticeSession> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRACTICESESSION,
    payload: axios.get<IPracticeSession>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPracticeSession> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRACTICESESSION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPracticeSession> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRACTICESESSION,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IPracticeSession> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_PRACTICESESSION,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPracticeSession> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRACTICESESSION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
