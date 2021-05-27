import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { setFileData, openFile, byteSize, Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './sub-category.reducer';
import { ISubCategory } from 'app/shared/model/sub-category.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISubCategoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SubCategoryUpdate = (props: ISubCategoryUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { subCategoryEntity, categories, loading, updating } = props;

  const { photo, photoContentType, voiceFile, voiceFileContentType } = subCategoryEntity;

  const handleClose = () => {
    props.history.push('/sub-category' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCategories();
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
        ...subCategoryEntity,
        ...values,
        category: categories.find(it => it.id.toString() === values.categoryId.toString()),
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
          <h2 id="magicBodyApp.subCategory.home.createOrEditLabel" data-cy="SubCategoryCreateUpdateHeading">
            <Translate contentKey="magicBodyApp.subCategory.home.createOrEditLabel">Create or edit a SubCategory</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : subCategoryEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="sub-category-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="sub-category-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="sub-category-title">
                  <Translate contentKey="magicBodyApp.subCategory.title">Title</Translate>
                </Label>
                <AvField id="sub-category-title" data-cy="title" type="text" name="title" />
              </AvGroup>
              <AvGroup>
                <Label id="photoUrlLabel" for="sub-category-photoUrl">
                  <Translate contentKey="magicBodyApp.subCategory.photoUrl">Photo Url</Translate>
                </Label>
                <AvField id="sub-category-photoUrl" data-cy="photoUrl" type="text" name="photoUrl" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="photoLabel" for="photo">
                    <Translate contentKey="magicBodyApp.subCategory.photo">Photo</Translate>
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
                <Label id="voiceUrlLabel" for="sub-category-voiceUrl">
                  <Translate contentKey="magicBodyApp.subCategory.voiceUrl">Voice Url</Translate>
                </Label>
                <AvField id="sub-category-voiceUrl" data-cy="voiceUrl" type="text" name="voiceUrl" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="voiceFileLabel" for="voiceFile">
                    <Translate contentKey="magicBodyApp.subCategory.voiceFile">Voice File</Translate>
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
                <Label id="masterDescriptionLabel" for="sub-category-masterDescription">
                  <Translate contentKey="magicBodyApp.subCategory.masterDescription">Master Description</Translate>
                </Label>
                <AvField id="sub-category-masterDescription" data-cy="masterDescription" type="text" name="masterDescription" />
              </AvGroup>
              <AvGroup>
                <Label id="masterAdviceLabel" for="sub-category-masterAdvice">
                  <Translate contentKey="magicBodyApp.subCategory.masterAdvice">Master Advice</Translate>
                </Label>
                <AvField id="sub-category-masterAdvice" data-cy="masterAdvice" type="text" name="masterAdvice" />
              </AvGroup>
              <AvGroup>
                <Label for="sub-category-category">
                  <Translate contentKey="magicBodyApp.subCategory.category">Category</Translate>
                </Label>
                <AvInput id="sub-category-category" data-cy="category" type="select" className="form-control" name="categoryId">
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
              <Button tag={Link} id="cancel-save" to="/sub-category" replace color="info">
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
  categories: storeState.category.entities,
  subCategoryEntity: storeState.subCategory.entity,
  loading: storeState.subCategory.loading,
  updating: storeState.subCategory.updating,
  updateSuccess: storeState.subCategory.updateSuccess,
});

const mapDispatchToProps = {
  getCategories,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryUpdate);
