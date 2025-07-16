import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  techStacks: {
    type: [String],
    default: []
  },
  demoLink: {
    type: String,
    trim: true
  },
  githubLink: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
