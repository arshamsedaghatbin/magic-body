package com.papra.magicbody.service.mapper;

import com.papra.magicbody.domain.*;
import com.papra.magicbody.service.dto.SubCategoryDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link SubCategory} and its DTO {@link SubCategoryDTO}.
 */
@Mapper(componentModel = "spring", uses = { CategoryMapper.class })
public interface SubCategoryMapper extends EntityMapper<SubCategoryDTO, SubCategory> {
    @Mapping(target = "category", source = "category", qualifiedByName = "id")
    SubCategoryDTO toDto(SubCategory s);
}
