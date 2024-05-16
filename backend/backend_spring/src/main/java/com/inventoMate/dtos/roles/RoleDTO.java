package com.inventoMate.dtos.roles;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@NoArgsConstructor
@Data
public class RoleDTO {

	private String id;
	private String name;
	private String description;

}
