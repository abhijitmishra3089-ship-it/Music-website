
import mongoose from 'mongoose';

const playHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },

    songId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song',
      required: true,
      index: true
    },

    playedAt: {
      type: Date,
      default: Date.now,
      required: true
    },

    durationPlayed: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

playHistorySchema.index({
  userId: 1,
  playedAt: -1
});

const PlayHistory = mongoose.model(
  'PlayHistory',
  playHistorySchema
);

export default PlayHistory;
