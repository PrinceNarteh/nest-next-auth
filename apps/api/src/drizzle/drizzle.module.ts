import { Pool } from 'pg';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

export const DRIZZLE = Symbol('drizzle-connection');
@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const dbURL = config.get<string>('DATABASE_URL');
        const pool = new Pool({
          connectionString: dbURL,
        });
        return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
