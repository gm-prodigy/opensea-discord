import {
  InjectDiscordClient,
  Once,
  DiscordModule,
} from '@discord-nestjs/core';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
//seems like the import is not working properly for axios, they broke it in the latest version
const axios = require('axios');
import { Client, Message } from 'discord.js';
import { SearchCommand } from './commands/search.command';


@Module({
  imports: [
    ConfigModule,
    DiscordModule.forFeature(),
  ],
  providers: [SearchCommand],
})

export class BotGateway {
  private readonly logger = new Logger("Opensea Bot Logger");

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  @Once('ready')
  onReady() {
    this.logger.log(`Bot ${this.client.user.tag} was started!`);
  }
}

export async function openseaSearchFuntion(searchQuery: string) {
  try{
    const response = await axios.get(`https://testnets-api.opensea.io/api/v1/collection/${searchQuery}?format=json`);
    return response.data;
  } catch (error) {
    return error.response.status;
  }
};