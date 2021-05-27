import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPractice, defaultValue } from 'app/shared/model/practice.model';

export const ACTION_TYPES = {
  FETCH_PRACTICE_LIST: 'practice/FETCH_PRACTICE_LIST',
  FETCH_PRACTICE: 'practice/FETCH_PRACTICE',
  CREATE_PRACTICE: 'practice/CREATE_PRACTICE',
  UPDATE_PRACTICE: 'practice/UPDATE_PRACTICE',
  PARTIAL_UPDATE_PRACTICE: 'practice/PARTIAL_UPDATE_PRACTICE',
  DELETE_PRACTICE: 'practice/DELETE_PRACTICE',
  SET_BLOB: 'practice/SET_BLOB',
  RESET: 'practice/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPractice>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type PracticeState = Readonly<typeof initialState>;

// Reducer

export default (state: PracticeState = initialState, action): PracticeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRACTICE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRACTICE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PRACTICE):
    case REQUEST(ACTION_TYPES.UPDATE_PRACTICE):
    case REQUEST(ACTION_TYPES.DELETE_PRACTICE):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_PRACTICE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PRACTICE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRACTICE):
    case FAILURE(ACTION_TYPES.CREATE_PRACTICE):
    case FAILURE(ACTION_TYPES.UPDATE_PRACTICE):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_PRACTICE):
    case FAILURE(ACTION_TYPES.DELETE_PRACTICE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRACTICE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRACTICE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRACTICE):
    case SUCCESS(ACTION_TYPES.UPDATE_PRACTICE):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_PRACTICE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRACTICE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/practices';

// Actions

export const getEntities: ICrudGetAllAction<IPractice> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PRACTICE_LIST,
    payload: axios.get<IPractice>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IPractice> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRACTICE,
    payload: axios.get<IPractice>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPractice> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRACTICE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPractice> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRACTICE,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IPractice> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_PRACTICE,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPractice> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRACTICE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
