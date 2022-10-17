import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("contacts", (table) => {
    table.increments();
    table.text("firstName").notNullable();
    table.text("lastName").notNullable();
    table.text("phoneNumber").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("contacts");
}
