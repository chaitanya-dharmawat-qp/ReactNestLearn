// file path: src/msw/mswDevServer.ts
import {setupWorker} from 'msw/browser'
import { mswDevHandlers } from './mockDbs/handlers/mswDevHandlers'

export const mswDevServer = setupWorker(...mswDevHandlers)