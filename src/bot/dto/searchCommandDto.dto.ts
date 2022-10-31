import { ArgNum, Param } from "@discord-nestjs/core";
import { Transform } from 'class-transformer';
export class SearchCommandDto {
    @ArgNum(() => ({ position: 0 }))
    @Transform(({ value }) => value.toLowerCase())
    @Param({
      name: 'param',
      description:
        'Searches OpenSea for a specific NFT',
      required: true,
    })
    param: string;

    @ArgNum(() => ({ position: 1 }))
    @Param({
      name: 'ephemeral',
      description:
        'Determines if the message is ephemeral( private or not )',
      required: true,
    })
    ephemeral: boolean;

}
  