import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './practice.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPracticeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PracticeDetail = (props: IPracticeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { practiceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="practiceDetailsHeading">
          <Translate contentKey="magicBodyApp.practice.detail.title">Practice</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{practiceEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="magicBodyApp.practice.title">Title</Translate>
            </span>
          </dt>
          <dd>{practiceEntity.title}</dd>
          <dt>
            <span id="photoUrl">
              <Translate contentKey="magicBodyApp.practice.photoUrl">Photo Url</Translate>
            </span>
          </dt>
          <dd>{practiceEntity.photoUrl}</dd>
          <dt>
            <span id="photo">
              <Translate contentKey="magicBodyApp.practice.photo">Photo</Translate>
            </span>
          </dt>
          <dd>
            {practiceEntity.photo ? (
              <div>
                {practiceEntity.photoContentType ? (
                  <a onClick={openFile(practiceEntity.photoContentType, practiceEntity.photo)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {practiceEntity.photoContentType}, {byteSize(practiceEntity.photo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="voiceUrl">
              <Translate contentKey="magicBodyApp.practice.voiceUrl">Voice Url</Translate>
            </span>
          </dt>
          <dd>{practiceEntity.voiceUrl}</dd>
          <dt>
            <span id="voiceFile">
              <Translate contentKey="magicBodyApp.practice.voiceFile">Voice File</Translate>
            </span>
          </dt>
          <dd>
            {practiceEntity.voiceFile ? (
              <div>
                {practiceEntity.voiceFileContentType ? (
                  <a onClick={openFile(practiceEntity.voiceFileContentType, practiceEntity.voiceFile)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {practiceEntity.voiceFileContentType}, {byteSize(practiceEntity.voiceFile)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="masterDescription">
              <Translate contentKey="magicBodyApp.practice.masterDescription">Master Description</Translate>
            </span>
          </dt>
          <dd>{practiceEntity.masterDescription}</dd>
          <dt>
            <span id="masterAdvice">
              <Translate contentKey="magicBodyApp.practice.masterAdvice">Master Advice</Translate>
            </span>
          </dt>
          <dd>{practiceEntity.masterAdvice}</dd>
        </dl>
        <Button tag={Link} to="/practice" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/practice/${practiceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ practice }: IRootState) => ({
  practiceEntity: practice.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PracticeDetail);
