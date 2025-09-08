// file path: frontend/main-app/src/msw/mswTestServer.ts
import {setupServer} from 'msw/node'
import { mswDevHandlers } from './mockDbs/handlers/mswDevHandlers'

export const mswTestServer = setupServer(...[...mswDevHandlers])

export * from 'msw'