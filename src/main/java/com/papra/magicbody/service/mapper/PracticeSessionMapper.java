package com.papra.magicbody.service.mapper;

import com.papra.magicbody.domain.*;
import com.papra.magicbody.service.dto.PracticeSessionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link PracticeSession} and its DTO {@link PracticeSessionDTO}.
 */
@Mapper(componentModel = "spring", uses = { PracticeMapper.class })
public interface PracticeSessionMapper extends EntityMapper<PracticeSessionDTO, PracticeSession> {
    @Mapping(target = "practice", source = "practice", qualifiedByName = "id")
    PracticeSessionDTO toDto(PracticeSession s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    PracticeSessionDTO toDtoId(PracticeSession practiceSession);
}
