package com.inventoMate.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inventoMate.entities.MeliToken;

@Repository
public interface MeliTokenRepository extends JpaRepository<MeliToken, String> {

}
