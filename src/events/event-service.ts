import mongoose, { SortOrder } from "mongoose";
import { CreateEventDto } from "./dtos/CreateEvent.dot";
import EventModel, { IEvent } from "./models/Event";
import { Event } from "./types/response";

class EventService {
  async getEventById(id: string): Promise<IEvent | null> {
    return await EventModel.findById(id).exec();
  }

  async getEvents(
    page: number,
    limit: number,
    sortBy: string,
    sortDirection: "asc" | "desc"
  ): Promise<IEvent[]> {
    const skip = (page - 1) * limit;
    const sortOptions: { [key: string]: SortOrder } = {
      [sortBy]: sortDirection === "asc" ? 1 : -1,
    };
    return await EventModel.find()
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
    const { name, description, date, location, duration } = createEventDto;
    const newEvent = new EventModel({
      name,
      description,
      date: new Date(date),
      location,
      duration,
    });

    await newEvent.save();
    return newEvent;
  }
}

export default EventService;
