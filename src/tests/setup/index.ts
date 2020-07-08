/* eslint-disable import/first */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import express from 'express';
import expressLoader from '../../loaders/server';

const app = express();
expressLoader({ app });

export const server = app;
