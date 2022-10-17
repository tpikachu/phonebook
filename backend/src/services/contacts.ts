import db from "../database/db";
import { IContact } from "../schemas/contacts";

export const getContacts = async (
  query: string
): Promise<Array<IContact> | []> => {
  if (!query || !query.length) {
    const contacts = await db.select().table("contacts");
    return contacts;
  } else {
    // NOTE: Sqlite3 doesn't support the ilike so please be aware of this one
    const contats = await db("contacts").whereLike("lastName", `%${query}%`);
    return contats;
  }
};

export const createContact = async (newContact: IContact): Promise<string> => {
  try {
    await db("contacts").insert(newContact);
    return "Successfully added!";
  } catch (err) {
    return err.message;
  }
};

export const updateContact = async (
  id: Number,
  newContact: IContact
): Promise<string> => {
  try {
    await db("contacts").where("id", "=", id).update(newContact);
    return "Successfully updated!";
  } catch (err) {
    return err.message;
  }
};

export const deleteContact = async (id: number): Promise<string> => {
  try {
    await db("contacts").where("id", "=", id).delete();
    return "Successfully removed!";
  } catch (err) {
    return err.message;
  }
};
