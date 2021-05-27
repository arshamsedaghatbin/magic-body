import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './action.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IActionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ActionDetail = (props: IActionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { actionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="actionDetailsHeading">
          <Translate contentKey="magicBodyApp.action.detail.title">Action</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{actionEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="magicBodyApp.action.title">Title</Translate>
            </span>
          </dt>
          <dd>{actionEntity.title}</dd>
          <dt>
            <span id="photoUrl">
              <Translate contentKey="magicBodyApp.action.photoUrl">Photo Url</Translate>
            </span>
          </dt>
          <dd>{actionEntity.photoUrl}</dd>
          <dt>
            <span id="photo">
              <Translate contentKey="magicBodyApp.action.photo">Photo</Translate>
            </span>
          </dt>
          <dd>
            {actionEntity.photo ? (
              <div>
                {actionEntity.photoContentType ? (
                  <a onClick={openFile(actionEntity.photoContentType, actionEntity.photo)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {actionEntity.photoContentType}, {byteSize(actionEntity.photo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="code">
              <Translate contentKey="magicBodyApp.action.code">Code</Translate>
            </span>
          </dt>
          <dd>{actionEntity.code}</dd>
          <dt>
            <span id="video">
              <Translate contentKey="magicBodyApp.action.video">Video</Translate>
            </span>
          </dt>
          <dd>
            {actionEntity.video ? (
              <div>
                {actionEntity.videoContentType ? (
                  <a onClick={openFile(actionEntity.videoContentType, actionEntity.video)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {actionEntity.videoContentType}, {byteSize(actionEntity.video)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="videoUrl">
              <Translate contentKey="magicBodyApp.action.videoUrl">Video Url</Translate>
            </span>
          </dt>
          <dd>{actionEntity.videoUrl}</dd>
          <dt>
            <span id="masterDescription">
              <Translate contentKey="magicBodyApp.action.masterDescription">Master Description</Translate>
            </span>
          </dt>
          <dd>{actionEntity.masterDescription}</dd>
          <dt>
            <Translate contentKey="magicBodyApp.action.category">Category</Translate>
          </dt>
          <dd>{actionEntity.category ? actionEntity.category.id : ''}</dd>
          <dt>
            <Translate contentKey="magicBodyApp.action.session">Session</Translate>
          </dt>
          <dd>{actionEntity.session ? actionEntity.session.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/action" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/action/${actionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ action }: IRootState) => ({
  actionEntity: action.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ActionDetail);
