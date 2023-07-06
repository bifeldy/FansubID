import { SetMetadata } from '@nestjs/common';

import { CONSTANTS } from '../../constants';

export const VerifiedOnly = (isVerifiedRequired = true) => SetMetadata(CONSTANTS.decoratorVerifiedOnly, isVerifiedRequired);
