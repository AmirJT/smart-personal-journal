const { generateToken } = require("../utils/auth");
const { fetchRandomQuote } = require("../services/quoteService");
const { addJournalEntry, editJournalEntry, deleteJournalEntry } = require("../controllers/journalController");
const User = require("../models/User");
const JournalEntry = require("../models/JournalEntry");

const resolvers = {
  Query: {
    getUser: async (_, __, context) => {
      if (!context.user) throw new Error("Unauthorized: Please log in.");
      const user = await User.findById(context.user._id);
      if (!user) throw new Error("User not found.");
      return user;
    },

    getJournalEntries: async (_, __, context) => {
      if (!context.user) throw new Error("Unauthorized: Please log in.");
      return await JournalEntry.find({ userId: context.user._id }).sort({ createdAt: -1 });
    },

    getRandomQuote: async () => {
      return await fetchRandomQuote();
    }
  },

  Mutation: {
    register: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("Email already in use.");

      const user = new User({ username, email, password });
      await user.save();

      const token = generateToken(user); 
      return { token, user };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found.");
      if (user.password !== password) throw new Error("Invalid credentials.");

      const token = generateToken(user); 
      return { token, user };
    },

    addJournalEntry: async (_, { title, content }, context) => {
      if (!context.user) throw new Error("Unauthorized: Please log in.");
      return await addJournalEntry(context.user._id, title, content); 
    },

    editJournalEntry: async (_, { id, title, content }, context) => {
      if (!context.user) throw new Error("Unauthorized: Please log in.");
      return await editJournalEntry(context.user._id, id, title, content); 
    },

    deleteJournalEntry: async (_, { id }, context) => {
      if (!context.user) throw new Error("Unauthorized: Please log in.");
      return await deleteJournalEntry(context.user._id, id); 
    },
  },
};

module.exports = resolvers;