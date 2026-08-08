const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  eventDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'closed', 'cancelled'], default: 'active' },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }, 
    address: { type: String }
  }
}, { timestamps: true });

eventSchema.index({ location: '2dsphere' });
eventSchema.index({ eventDate: 1 });

eventSchema.pre('save', function() {
  if (this.isModified('eventDate') || this.isNew) {
    if (new Date(this.eventDate) < new Date()) {
      this.status = 'closed';
    }
  }
});

eventSchema.statics.findNearby = function(long, lat, maxDistanceInMeters) {
  return this.find({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [long, lat] },
        $maxDistance: maxDistanceInMeters
      }
    },
    status: 'active'
  }).populate('organizer', 'name email phone');
};

module.exports = mongoose.model('Event', eventSchema);