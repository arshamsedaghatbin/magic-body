import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPractice } from 'app/shared/model/practice.model';
import { getEntities as getPractices } from 'app/entities/practice/practice.reducer';
import { getEntity, updateEntity, createEntity, reset } from './practice-session.reducer';
import { IPracticeSession } from 'app/shared/model/practice-session.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPracticeSessionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PracticeSessionUpdate = (props: IPracticeSessionUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { practiceSessionEntity, practices, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/practice-session' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPractices();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...practiceSessionEntity,
        ...values,
        practice: practices.find(it => it.id.toString() === values.practiceId.toString()),
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
          <h2 id="magicBodyApp.practiceSession.home.createOrEditLabel" data-cy="PracticeSessionCreateUpdateHeading">
            <Translate contentKey="magicBodyApp.practiceSession.home.createOrEditLabel">Create or edit a PracticeSession</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : practiceSessionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="practice-session-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="practice-session-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="tiltleLabel" for="practice-session-tiltle">
                  <Translate contentKey="magicBodyApp.practiceSession.tiltle">Tiltle</Translate>
                </Label>
                <AvField id="practice-session-tiltle" data-cy="tiltle" type="text" name="tiltle" />
              </AvGroup>
              <AvGroup>
                <Label for="practice-session-practice">
                  <Translate contentKey="magicBodyApp.practiceSession.practice">Practice</Translate>
                </Label>
                <AvInput id="practice-session-practice" data-cy="practice" type="select" className="form-control" name="practiceId">
                  <option value="" key="0" />
                  {practices
                    ? practices.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/practice-session" replace color="info">
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
  practices: storeState.practice.entities,
  practiceSessionEntity: storeState.practiceSession.entity,
  loading: storeState.practiceSession.loading,
  updating: storeState.practiceSession.updating,
  updateSuccess: storeState.practiceSession.updateSuccess,
});

const mapDispatchToProps = {
  getPractices,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PracticeSessionUpdate);
