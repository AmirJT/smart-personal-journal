const JournalEntry = require("../models/JournalEntry");

const addJournalEntry = async (userId, title, content) => {
  const entry = new JournalEntry({ title, content, userId, createdAt: new Date() });
  await entry.save();
  return entry;
};

const editJournalEntry = async (userId, entryId, title, content) => {
  const entry = await JournalEntry.findOneAndUpdate(
    { _id: entryId, userId },
    { title, content },
    { new: true }
  );
  if (!entry) throw new Error("Entry not found or you don't have permission.");
  return entry;
};

const deleteJournalEntry = async (userId, entryId) => {
  const entry = await JournalEntry.findOneAndDelete({ _id: entryId, userId });
  if (!entry) throw new Error("Entry not found or you don't have permission.");
  return "Journal entry deleted successfully.";
};

module.exports = { addJournalEntry, editJournalEntry, deleteJournalEntry };