import { CreateHandlerOptions, HandlerErrorCallback, HandlerMethod } from "../types";
import { IncomingMessage, ServerResponse } from "http";
import EventEmitter from "events"
import bl from "bl"
import { checkTypes } from "../util/checkTypes";
import { verify } from "../util/verifyData";

function findHandler(url, arr) {
  if (!Array.isArray(arr)) return arr;

  let ret = arr[0]
  for (let i = 0; i < arr.length; i++) {
    if (url === arr[i].path) {
      ret = arr[i]
    }
  }

  return ret
}

export const createHandler = (initOptions: CreateHandlerOptions) => {
  let options
  // validate type of options
  if (Array.isArray(initOptions)) {
    for (let i = 0; i < initOptions.length; i++) {
      checkTypes(initOptions[i])
    }
  } else {
    checkTypes(initOptions)
  }


  let handler: HandlerMethod = Object.setPrototypeOf((req: IncomingMessage, res: ServerResponse, errback: HandlerErrorCallback): void => {
    let events

    options = findHandler(req.url, initOptions)

    if (typeof options.events === 'string' && options.events !== '*') {
      events = [options.events]
    } else if (Array.isArray(options.events) && options.events.indexOf('*') === -1) {
      events = options.events
    }

    if (req.url !== options.path) return errback();
    if (req.method !== 'POST') return errback();

    function hasError(msg: string) {
      res.writeHead(400, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ error: msg }))

      const err = new Error(msg)

      handler.emit('error', err, req)
      errback(err)
    }

    const sig = req.headers['x-hub-signature'];
    const event = req.headers['x-github-event'] as string;
    const id = req.headers['x-github-delivery'];

    if (!sig) return hasError('No X-Hub-Signature found on request');
    if (!event) return hasError('No X-Github-Event found on request');
    if (!id) return hasError('No X-Github-Delivery found on request');
    if (events && events.indexOf(event) === -1) return hasError('X-Github-Event is not acceptable');

    req.pipe(bl((err, data) => {
      if (err) return hasError(err.message);

      let obj

      if (!verify(sig, data, options)) return hasError('X-Hub-Signature does not match blob signature');

      try {
        obj = JSON.parse(data.toString())
      } catch (e) {
        return hasError(e as string)
      }

      res.writeHead(200, { 'content-type': 'application/json' })
      res.end('{"ok":true}')

      const emitData = {
        event: event,
        id: id,
        payload: obj,
        //protocol: req.protocol,
        host: req.headers.host,
        url: req.url,
        path: options.path
      }

      handler.emit(event, emitData)
      handler.emit('*', emitData)
    }))
  }, EventEmitter.prototype)

  // make it an EventEmitter
  //  Object.setPrototypeOf(handler, EventEmitter.prototype)
  //  EventEmitter.call(handler)
  // handler.sign = sign
  // handler.verify = verify

  return handler
}
