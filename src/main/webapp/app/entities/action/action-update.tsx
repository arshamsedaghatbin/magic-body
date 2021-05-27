import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { setFileData, openFile, byteSize, Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBookMarkAction } from 'app/shared/model/book-mark-action.model';
import { getEntities as getBookMarkActions } from 'app/entities/book-mark-action/book-mark-action.reducer';
import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { IPracticeSession } from 'app/shared/model/practice-session.model';
import { getEntities as getPracticeSessions } from 'app/entities/practice-session/practice-session.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './action.reducer';
import { IAction } from 'app/shared/model/action.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IActionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ActionUpdate = (props: IActionUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { actionEntity, bookMarkActions, categories, practiceSessions, loading, updating } = props;

  const { photo, photoContentType, video, videoContentType } = actionEntity;

  const handleClose = () => {
    props.history.push('/action' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getBookMarkActions();
    props.getCategories();
    props.getPracticeSessions();
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
        ...actionEntity,
        ...values,
        category: categories.find(it => it.id.toString() === values.categoryId.toString()),
        session: practiceSessions.find(it => it.id.toString() === values.sessionId.toString()),
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
          <h2 id="magicBodyApp.action.home.createOrEditLabel" data-cy="ActionCreateUpdateHeading">
            <Translate contentKey="magicBodyApp.action.home.createOrEditLabel">Create or edit a Action</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : actionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="action-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="action-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="action-title">
                  <Translate contentKey="magicBodyApp.action.title">Title</Translate>
                </Label>
                <AvField id="action-title" data-cy="title" type="text" name="title" />
              </AvGroup>
              <AvGroup>
                <Label id="photoUrlLabel" for="action-photoUrl">
                  <Translate contentKey="magicBodyApp.action.photoUrl">Photo Url</Translate>
                </Label>
                <AvField id="action-photoUrl" data-cy="photoUrl" type="text" name="photoUrl" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="photoLabel" for="photo">
                    <Translate contentKey="magicBodyApp.action.photo">Photo</Translate>
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
                <Label id="codeLabel" for="action-code">
                  <Translate contentKey="magicBodyApp.action.code">Code</Translate>
                </Label>
                <AvField id="action-code" data-cy="code" type="text" name="code" validate={{}} />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="videoLabel" for="video">
                    <Translate contentKey="magicBodyApp.action.video">Video</Translate>
                  </Label>
                  <br />
                  {video ? (
                    <div>
                      {videoContentType ? (
                        <a onClick={openFile(videoContentType, video)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {videoContentType}, {byteSize(video)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('video')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_video" data-cy="video" type="file" onChange={onBlobChange(false, 'video')} />
                  <AvInput type="hidden" name="video" value={video} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="videoUrlLabel" for="action-videoUrl">
                  <Translate contentKey="magicBodyApp.action.videoUrl">Video Url</Translate>
                </Label>
                <AvField id="action-videoUrl" data-cy="videoUrl" type="text" name="videoUrl" />
              </AvGroup>
              <AvGroup>
                <Label id="masterDescriptionLabel" for="action-masterDescription">
                  <Translate contentKey="magicBodyApp.action.masterDescription">Master Description</Translate>
                </Label>
                <AvField id="action-masterDescription" data-cy="masterDescription" type="text" name="masterDescription" />
              </AvGroup>
              <AvGroup>
                <Label for="action-category">
                  <Translate contentKey="magicBodyApp.action.category">Category</Translate>
                </Label>
                <AvInput id="action-category" data-cy="category" type="select" className="form-control" name="categoryId">
                  <option value="" key="0" />
                  {categories
                    ? categories.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="action-session">
                  <Translate contentKey="magicBodyApp.action.session">Session</Translate>
                </Label>
                <AvInput id="action-session" data-cy="session" type="select" className="form-control" name="sessionId">
                  <option value="" key="0" />
                  {practiceSessions
                    ? practiceSessions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/action" replace color="info">
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
  bookMarkActions: storeState.bookMarkAction.entities,
  categories: storeState.category.entities,
  practiceSessions: storeState.practiceSession.entities,
  actionEntity: storeState.action.entity,
  loading: storeState.action.loading,
  updating: storeState.action.updating,
  updateSuccess: storeState.action.updateSuccess,
});

const mapDispatchToProps = {
  getBookMarkActions,
  getCategories,
  getPracticeSessions,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ActionUpdate);
