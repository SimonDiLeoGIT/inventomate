package com.inventoMate.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inventoMate.entities.InvitacionSucursal;

@Repository
public interface InvitacionRepository extends JpaRepository<InvitacionSucursal, Long> {
	
    Optional<InvitacionSucursal> findByToken(String token);
}

