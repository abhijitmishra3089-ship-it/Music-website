
import mongoose from 'mongoose';

const playlistTrackSchema = new mongoose.Schema(
  {
    playlistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Playlist',
      required: true,
      index: true
    },

    songId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song',
      required: true
    },

    position: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

playlistTrackSchema.index(
  { playlistId: 1, position: 1 }
);

const PlaylistTrack = mongoose.model(
  'PlaylistTrack',
  playlistTrackSchema
);

export default PlaylistTrack;
