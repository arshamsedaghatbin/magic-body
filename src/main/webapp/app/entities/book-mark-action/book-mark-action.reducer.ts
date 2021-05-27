import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBookMarkAction, defaultValue } from 'app/shared/model/book-mark-action.model';

export const ACTION_TYPES = {
  FETCH_BOOKMARKACTION_LIST: 'bookMarkAction/FETCH_BOOKMARKACTION_LIST',
  FETCH_BOOKMARKACTION: 'bookMarkAction/FETCH_BOOKMARKACTION',
  CREATE_BOOKMARKACTION: 'bookMarkAction/CREATE_BOOKMARKACTION',
  UPDATE_BOOKMARKACTION: 'bookMarkAction/UPDATE_BOOKMARKACTION',
  PARTIAL_UPDATE_BOOKMARKACTION: 'bookMarkAction/PARTIAL_UPDATE_BOOKMARKACTION',
  DELETE_BOOKMARKACTION: 'bookMarkAction/DELETE_BOOKMARKACTION',
  RESET: 'bookMarkAction/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBookMarkAction>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type BookMarkActionState = Readonly<typeof initialState>;

// Reducer

export default (state: BookMarkActionState = initialState, action): BookMarkActionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BOOKMARKACTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BOOKMARKACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_BOOKMARKACTION):
    case REQUEST(ACTION_TYPES.UPDATE_BOOKMARKACTION):
    case REQUEST(ACTION_TYPES.DELETE_BOOKMARKACTION):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_BOOKMARKACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_BOOKMARKACTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BOOKMARKACTION):
    case FAILURE(ACTION_TYPES.CREATE_BOOKMARKACTION):
    case FAILURE(ACTION_TYPES.UPDATE_BOOKMARKACTION):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_BOOKMARKACTION):
    case FAILURE(ACTION_TYPES.DELETE_BOOKMARKACTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BOOKMARKACTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_BOOKMARKACTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_BOOKMARKACTION):
    case SUCCESS(ACTION_TYPES.UPDATE_BOOKMARKACTION):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_BOOKMARKACTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_BOOKMARKACTION):
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

const apiUrl = 'api/book-mark-actions';

// Actions

export const getEntities: ICrudGetAllAction<IBookMarkAction> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_BOOKMARKACTION_LIST,
    payload: axios.get<IBookMarkAction>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IBookMarkAction> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BOOKMARKACTION,
    payload: axios.get<IBookMarkAction>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IBookMarkAction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BOOKMARKACTION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBookMarkAction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BOOKMARKACTION,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IBookMarkAction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_BOOKMARKACTION,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBookMarkAction> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BOOKMARKACTION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
