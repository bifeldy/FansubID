import { SetMetadata } from '@nestjs/common';

import { RoleModel } from '../../models/req-res.model';

export const Roles = (...roles: RoleModel[]) => SetMetadata('roles', roles);
