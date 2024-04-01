package com.inventoMate.dtos.roles;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@NoArgsConstructor
@Data
public class PermissionDTO {

	private String permissionName;
	private String permissionDescription;
	
}
