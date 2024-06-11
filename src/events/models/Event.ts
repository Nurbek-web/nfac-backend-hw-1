import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  id: number;
  name: string;
  description: string;
  date: Date;
  location: string;
  duration: string;
}

const EventSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String },
  description: { type: String },
  date: { type: String },
  location: { type: String },
  duration: { type: String },
});

export default mongoose.model<IEvent>("Event", EventSchema);
