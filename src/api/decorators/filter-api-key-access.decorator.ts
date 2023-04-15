import { SetMetadata } from '@nestjs/common';

import { CONSTANTS } from '../../constants';

export const FilterApiKeyAccess = (filterApiKeyAccess = true) => SetMetadata(CONSTANTS.decoratorFilterApiKeyAccess, filterApiKeyAccess);
