import { IncomingMessage, ServerResponse } from "http";
import { EventEmitter } from "events";

export interface CreateHandlerOptions {
  path: string;
  secret: string;
  events?: string | string[];
}

export type HandlerErrorCallback = (err?: Error) => void;

export interface HandlerMethod extends EventEmitter {
  (req: IncomingMessage, res: ServerResponse, errback: HandlerErrorCallback): void;
}