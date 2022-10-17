import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("contacts", function (table) {
    table.unique(["phoneNumber"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("contacts", function (table) {
    table.dropUnique(["phoneNumber"]);
  });
}
