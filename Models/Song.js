const mongoose = require("mongoose");

const artistSchema = mongoose.Schema({
  id: String,
  name: String,
  role: String,
  image: String,
  perma_url: String,
  type: String,
});

const artistMapSchema = mongoose.Schema({
  artists: [artistSchema],
  featured_artists: [artistSchema],
  primary_artists: [artistSchema],
});

const moreSchema = mongoose.Schema({
  music: String,
  album_id: String,
  album_url: String,
  album: String,
  label: String,
  "320kbps": String,
  encrypted_media_url: String,
  encrypted_drm_media_url: String,
  has_lyrics: String,
  lyrics_snippet: String,
  duration: String,
  artistMap: artistMapSchema,
  release_date: String,
  has_video: Boolean,
  video_url: String,
  video_preview_url: String,
  video_thumbnail: String,
});

const songSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: String,
  type: { type: String, default: "song" },
  image: { type: String, required: true },
  language: String,
  year: String,
  play_count: String,
  more_info: moreSchema,
  perma_url: String,
});

songSchema.index({ title: 1, subtitle: 1 });

songSchema.pre("insertMany", async function (next, docs) {
  for (const doc of docs) {
    if (doc?.perma_url?.length != 0) {
      const splitter = doc.perma_url.split("/");
      doc.perma_url = splitter[splitter.length - 1];
    }
    if (doc?.more_info?.album_url?.length != 0) {
      const splitter = doc.more_info.album_url.split("/");
      doc.more_info.album_url = splitter[splitter.length - 1];
    }
  }
  next();
});
module.exports = mongoose.model("song", songSchema);
