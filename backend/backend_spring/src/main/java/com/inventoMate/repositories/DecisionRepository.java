package com.inventoMate.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inventoMate.entities.Decision;

@Repository
public interface DecisionRepository extends JpaRepository<Decision, Long> {

}
