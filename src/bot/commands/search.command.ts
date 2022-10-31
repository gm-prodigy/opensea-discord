import { TransformPipe } from "@discord-nestjs/common";
import { Command, DiscordTransformedCommand, Payload, TransformedCommandExecutionContext, UsePipes } from "@discord-nestjs/core";

import { openseaSearchFuntion } from "../bot.gateway";
//seems like the import is not working properly for axios, they broke it in the latest version
const axios = require('axios');
import { SearchCommandDto } from "../dto/searchCommandDto.dto";

@Command({
    name: 'search',
    description: 'Searches OpenSea',
})

@UsePipes(TransformPipe)
export class SearchCommand implements DiscordTransformedCommand<SearchCommandDto>{
    async handler(@Payload() dto: SearchCommandDto, { interaction }: TransformedCommandExecutionContext,): Promise<string> {
        
        await openseaSearchFuntion(dto.param).then((response: any) => {
            
            function reply(message: string) {
                return interaction.reply({
                    content: message,
                    ephemeral: dto.ephemeral,
                });
            }

            if(response == 404){
                return reply('No NFTs found');
            }

            if(response == 429){
                return reply('Too many requests, please try again later');
            }
            
            interaction.reply({
                embeds: [
                    {
                        title: `${response.collection.description}`,
                        description: response.description,
                        color: 0x00ff00,
                        fields: [
                            {
                                name: 'Name',
                                value: `${response.collection.name}`,
                                inline: true,
                            },
                            {
                                name: 'Floor Price',
                                value: `${response.collection.stats.floor_price}`,
                                inline: true,
                            },
                        ],
                        image: {
                            url: response.collection.image_url,
                        },
                        footer: {
                            text: 'Powered by OpenSea API',
                        },
                    },
                ],
                ephemeral: dto.ephemeral,
            });
        }).catch((error: any) => {
            console.log(error);
        });

        return
    }
}