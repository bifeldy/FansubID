import { SetMetadata } from '@nestjs/common';

export const VerifiedOnly = (isVerifiedRequired = true) => SetMetadata('verified-only', isVerifiedRequired);
