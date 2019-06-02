
import { Document } from "mongoose";

declare module 'egg' {
  export interface Context {
    model: IModel;
  }
}