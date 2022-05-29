import { SetMetadata } from '@nestjs/common';

import { CONSTANTS } from '../../constants';

import { RoleModel } from '../../models/req-res.model';

export const Roles = (...roles: RoleModel[]) => SetMetadata(CONSTANTS.decoratorRoles, roles);
