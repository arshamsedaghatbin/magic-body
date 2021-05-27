import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './practice-session.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPracticeSessionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PracticeSessionDetail = (props: IPracticeSessionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { practiceSessionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="practiceSessionDetailsHeading">
          <Translate contentKey="magicBodyApp.practiceSession.detail.title">PracticeSession</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{practiceSessionEntity.id}</dd>
          <dt>
            <span id="tiltle">
              <Translate contentKey="magicBodyApp.practiceSession.tiltle">Tiltle</Translate>
            </span>
          </dt>
          <dd>{practiceSessionEntity.tiltle}</dd>
          <dt>
            <Translate contentKey="magicBodyApp.practiceSession.practice">Practice</Translate>
          </dt>
          <dd>{practiceSessionEntity.practice ? practiceSessionEntity.practice.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/practice-session" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/practice-session/${practiceSessionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ practiceSession }: IRootState) => ({
  practiceSessionEntity: practiceSession.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PracticeSessionDetail);
