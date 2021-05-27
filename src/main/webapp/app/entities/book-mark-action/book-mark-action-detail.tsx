import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './book-mark-action.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBookMarkActionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BookMarkActionDetail = (props: IBookMarkActionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { bookMarkActionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bookMarkActionDetailsHeading">
          <Translate contentKey="magicBodyApp.bookMarkAction.detail.title">BookMarkAction</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{bookMarkActionEntity.id}</dd>
          <dt>
            <span id="userDescription">
              <Translate contentKey="magicBodyApp.bookMarkAction.userDescription">User Description</Translate>
            </span>
          </dt>
          <dd>{bookMarkActionEntity.userDescription}</dd>
          <dt>
            <Translate contentKey="magicBodyApp.bookMarkAction.action">Action</Translate>
          </dt>
          <dd>{bookMarkActionEntity.action ? bookMarkActionEntity.action.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/book-mark-action" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/book-mark-action/${bookMarkActionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ bookMarkAction }: IRootState) => ({
  bookMarkActionEntity: bookMarkAction.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BookMarkActionDetail);
