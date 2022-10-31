import { DiscordModule } from "@discord-nestjs/core";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { IntentsBitField } from "discord.js";
import { BotGateway } from "./bot.gateway";

@Module({
  imports: [
    ConfigModule.forRoot(),
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get('TOKEN'),
        discordClientOptions: {
          intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.GuildMessageReactions,
            IntentsBitField.Flags.GuildMessageTyping
          ],
        },
      }),
      inject: [ConfigService],
    }),
    BotGateway,
  ],
})
export class BotModule {}