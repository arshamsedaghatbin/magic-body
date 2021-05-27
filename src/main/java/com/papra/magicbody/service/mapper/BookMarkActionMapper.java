package com.papra.magicbody.service.mapper;

import com.papra.magicbody.domain.*;
import com.papra.magicbody.service.dto.BookMarkActionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link BookMarkAction} and its DTO {@link BookMarkActionDTO}.
 */
@Mapper(componentModel = "spring", uses = { ActionMapper.class })
public interface BookMarkActionMapper extends EntityMapper<BookMarkActionDTO, BookMarkAction> {
    @Mapping(target = "action", source = "action", qualifiedByName = "id")
    BookMarkActionDTO toDto(BookMarkAction s);
}
