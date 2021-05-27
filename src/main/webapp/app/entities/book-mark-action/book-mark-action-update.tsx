import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAction } from 'app/shared/model/action.model';
import { getEntities as getActions } from 'app/entities/action/action.reducer';
import { getEntity, updateEntity, createEntity, reset } from './book-mark-action.reducer';
import { IBookMarkAction } from 'app/shared/model/book-mark-action.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBookMarkActionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BookMarkActionUpdate = (props: IBookMarkActionUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { bookMarkActionEntity, actions, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/book-mark-action' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getActions();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...bookMarkActionEntity,
        ...values,
        action: actions.find(it => it.id.toString() === values.actionId.toString()),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="magicBodyApp.bookMarkAction.home.createOrEditLabel" data-cy="BookMarkActionCreateUpdateHeading">
            <Translate contentKey="magicBodyApp.bookMarkAction.home.createOrEditLabel">Create or edit a BookMarkAction</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : bookMarkActionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="book-mark-action-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="book-mark-action-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="userDescriptionLabel" for="book-mark-action-userDescription">
                  <Translate contentKey="magicBodyApp.bookMarkAction.userDescription">User Description</Translate>
                </Label>
                <AvField id="book-mark-action-userDescription" data-cy="userDescription" type="text" name="userDescription" />
              </AvGroup>
              <AvGroup>
                <Label for="book-mark-action-action">
                  <Translate contentKey="magicBodyApp.bookMarkAction.action">Action</Translate>
                </Label>
                <AvInput id="book-mark-action-action" data-cy="action" type="select" className="form-control" name="actionId">
                  <option value="" key="0" />
                  {actions
                    ? actions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/book-mark-action" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  actions: storeState.action.entities,
  bookMarkActionEntity: storeState.bookMarkAction.entity,
  loading: storeState.bookMarkAction.loading,
  updating: storeState.bookMarkAction.updating,
  updateSuccess: storeState.bookMarkAction.updateSuccess,
});

const mapDispatchToProps = {
  getActions,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BookMarkActionUpdate);
