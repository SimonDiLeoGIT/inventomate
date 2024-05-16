package com.inventoMate.dtos.roles;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@NoArgsConstructor
@Data
public class RolePermissionsDTO {

	private RoleDTO rol;
	private List<PermissionDTO> permissions;

}