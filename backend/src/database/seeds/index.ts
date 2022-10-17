const mockContacts = [
  {
    id: 1,
    firstName: "Eric",
    lastName: "Elliot",
    phoneNumber: "222-555-6575",
  },
  {
    id: 2,
    firstName: "Steve",
    lastName: "Jobs",
    phoneNumber: "220-454-6754",
  },
  {
    id: 3,
    firstName: "Fred",
    lastName: "Allen",
    phoneNumber: "210-657-9886",
  },
  {
    id: 4,
    firstName: "Steve",
    lastName: "Wozniak",
    phoneNumber: "343-675-8768",
  },

  {
    id: 5,
    firstName: "Bill",
    lastName: "Gates",
    phoneNumber: "343-654-9688",
  },
];

export const seed = (knex) => {
  // Remote old entries and add mock up
  return knex("contacts")
    .del()
    .then(() => {
      return knex("contacts").insert(mockContacts);
    });
};
