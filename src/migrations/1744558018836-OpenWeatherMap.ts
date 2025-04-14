import { MigrationInterface, QueryRunner } from "typeorm";

export class OpenWeatherMap1744558018836 implements MigrationInterface {
    name = 'OpenWeatherMap1744558018836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."open_weather_parts_exclude_type" AS ENUM('current', 'minutely', 'hourly', 'daily', 'alerts')`);
        await queryRunner.query(`CREATE TABLE "open_weather_data" ("id" SERIAL NOT NULL, "date" date NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "part" "public"."open_weather_parts_exclude_type" array NOT NULL, "sunrise" integer NOT NULL, "sunset" integer NOT NULL, "temp" double precision NOT NULL, "feels_like" double precision NOT NULL, "pressure" integer NOT NULL, "humidity" integer NOT NULL, "uvi" integer NOT NULL, "wind_speed" double precision NOT NULL, CONSTRAINT "PK_d4f455515c5c818264c3c8179f1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_949cf9505965d6d429d7a2e2dd" ON "open_weather_data" ("latitude", "longitude", "date", "part") `);
        await queryRunner.query(`CREATE OR REPLACE FUNCTION sort_part_array() RETURNS TRIGGER AS $$ BEGIN NEW.part := ARRAY(SELECT unnest(NEW.part) ORDER BY 1); RETURN NEW; END; $$ LANGUAGE plpgsql;`);
        await queryRunner.query(`CREATE TRIGGER trg_sort_part_array BEFORE INSERT OR UPDATE ON "open_weather_data" FOR EACH ROW EXECUTE FUNCTION sort_part_array();`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS trg_sort_part_array ON "open_weather_data"`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS sort_part_array`);
        await queryRunner.query(`DROP INDEX "public"."IDX_949cf9505965d6d429d7a2e2dd"`);
        await queryRunner.query(`DROP TABLE "open_weather_data"`);
        await queryRunner.query(`DROP TYPE "public"."open_weather_parts_exclude_type"`);
    }

}
