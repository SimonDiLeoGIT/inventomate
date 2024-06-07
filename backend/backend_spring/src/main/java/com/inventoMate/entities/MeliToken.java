package com.inventoMate.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "MELI_TOKEN")
public class MeliToken {

	@Id
	private String id;
	@Column(name = "refresh_token")
	private String refreshToken;
	@Column(name = "access_token")
	private String accessToken;
	
}
