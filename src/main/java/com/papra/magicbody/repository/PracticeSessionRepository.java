package com.papra.magicbody.repository;

import com.papra.magicbody.domain.PracticeSession;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the PracticeSession entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PracticeSessionRepository extends JpaRepository<PracticeSession, Long> {}
