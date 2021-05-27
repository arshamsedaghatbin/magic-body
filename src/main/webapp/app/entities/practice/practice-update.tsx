import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { setFileData, openFile, byteSize, Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './practice.reducer';
import { IPractice } from 'app/shared/model/practice.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPracticeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PracticeUpdate = (props: IPracticeUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { practiceEntity, loading, updating } = props;

  const { photo, photoContentType, voiceFile, voiceFileContentType } = practiceEntity;

  const handleClose = () => {
    props.history.push('/practice' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...practiceEntity,
        ...values,
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
          <h2 id="magicBodyApp.practice.home.createOrEditLabel" data-cy="PracticeCreateUpdateHeading">
            <Translate contentKey="magicBodyApp.practice.home.createOrEditLabel">Create or edit a Practice</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : practiceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="practice-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="practice-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="practice-title">
                  <Translate contentKey="magicBodyApp.practice.title">Title</Translate>
                </Label>
                <AvField id="practice-title" data-cy="title" type="text" name="title" />
              </AvGroup>
              <AvGroup>
                <Label id="photoUrlLabel" for="practice-photoUrl">
                  <Translate contentKey="magicBodyApp.practice.photoUrl">Photo Url</Translate>
                </Label>
                <AvField id="practice-photoUrl" data-cy="photoUrl" type="text" name="photoUrl" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="photoLabel" for="photo">
                    <Translate contentKey="magicBodyApp.practice.photo">Photo</Translate>
                  </Label>
                  <br />
                  {photo ? (
                    <div>
                      {photoContentType ? (
                        <a onClick={openFile(photoContentType, photo)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {photoContentType}, {byteSize(photo)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('photo')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_photo" data-cy="photo" type="file" onChange={onBlobChange(false, 'photo')} />
                  <AvInput type="hidden" name="photo" value={photo} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="voiceUrlLabel" for="practice-voiceUrl">
                  <Translate contentKey="magicBodyApp.practice.voiceUrl">Voice Url</Translate>
                </Label>
                <AvField id="practice-voiceUrl" data-cy="voiceUrl" type="text" name="voiceUrl" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="voiceFileLabel" for="voiceFile">
                    <Translate contentKey="magicBodyApp.practice.voiceFile">Voice File</Translate>
                  </Label>
                  <br />
                  {voiceFile ? (
                    <div>
                      {voiceFileContentType ? (
                        <a onClick={openFile(voiceFileContentType, voiceFile)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {voiceFileContentType}, {byteSize(voiceFile)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('voiceFile')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_voiceFile" data-cy="voiceFile" type="file" onChange={onBlobChange(false, 'voiceFile')} />
                  <AvInput type="hidden" name="voiceFile" value={voiceFile} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="masterDescriptionLabel" for="practice-masterDescription">
                  <Translate contentKey="magicBodyApp.practice.masterDescription">Master Description</Translate>
                </Label>
                <AvField id="practice-masterDescription" data-cy="masterDescription" type="text" name="masterDescription" />
              </AvGroup>
              <AvGroup>
                <Label id="masterAdviceLabel" for="practice-masterAdvice">
                  <Translate contentKey="magicBodyApp.practice.masterAdvice">Master Advice</Translate>
                </Label>
                <AvField id="practice-masterAdvice" data-cy="masterAdvice" type="text" name="masterAdvice" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/practice" replace color="info">
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
  practiceEntity: storeState.practice.entity,
  loading: storeState.practice.loading,
  updating: storeState.practice.updating,
  updateSuccess: storeState.practice.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PracticeUpdate);
