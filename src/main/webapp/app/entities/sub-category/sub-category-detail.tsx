import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sub-category.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISubCategoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SubCategoryDetail = (props: ISubCategoryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { subCategoryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="subCategoryDetailsHeading">
          <Translate contentKey="magicBodyApp.subCategory.detail.title">SubCategory</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{subCategoryEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="magicBodyApp.subCategory.title">Title</Translate>
            </span>
          </dt>
          <dd>{subCategoryEntity.title}</dd>
          <dt>
            <span id="photoUrl">
              <Translate contentKey="magicBodyApp.subCategory.photoUrl">Photo Url</Translate>
            </span>
          </dt>
          <dd>{subCategoryEntity.photoUrl}</dd>
          <dt>
            <span id="photo">
              <Translate contentKey="magicBodyApp.subCategory.photo">Photo</Translate>
            </span>
          </dt>
          <dd>
            {subCategoryEntity.photo ? (
              <div>
                {subCategoryEntity.photoContentType ? (
                  <a onClick={openFile(subCategoryEntity.photoContentType, subCategoryEntity.photo)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {subCategoryEntity.photoContentType}, {byteSize(subCategoryEntity.photo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="voiceUrl">
              <Translate contentKey="magicBodyApp.subCategory.voiceUrl">Voice Url</Translate>
            </span>
          </dt>
          <dd>{subCategoryEntity.voiceUrl}</dd>
          <dt>
            <span id="voiceFile">
              <Translate contentKey="magicBodyApp.subCategory.voiceFile">Voice File</Translate>
            </span>
          </dt>
          <dd>
            {subCategoryEntity.voiceFile ? (
              <div>
                {subCategoryEntity.voiceFileContentType ? (
                  <a onClick={openFile(subCategoryEntity.voiceFileContentType, subCategoryEntity.voiceFile)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {subCategoryEntity.voiceFileContentType}, {byteSize(subCategoryEntity.voiceFile)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="masterDescription">
              <Translate contentKey="magicBodyApp.subCategory.masterDescription">Master Description</Translate>
            </span>
          </dt>
          <dd>{subCategoryEntity.masterDescription}</dd>
          <dt>
            <span id="masterAdvice">
              <Translate contentKey="magicBodyApp.subCategory.masterAdvice">Master Advice</Translate>
            </span>
          </dt>
          <dd>{subCategoryEntity.masterAdvice}</dd>
          <dt>
            <Translate contentKey="magicBodyApp.subCategory.category">Category</Translate>
          </dt>
          <dd>{subCategoryEntity.category ? subCategoryEntity.category.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/sub-category" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/sub-category/${subCategoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ subCategory }: IRootState) => ({
  subCategoryEntity: subCategory.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryDetail);
