import bodyParser from 'body-parser';
import cors from 'cors';
import { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import promBundle from 'express-prom-bundle';
import { UI } from 'bull-board';
import middleware from '../../api/middleware';
import config from '../../config';

import { RegisterRoutes } from '../../../build/routes';

const metricsMiddleware = promBundle({ includeMethod: true });
const { API_VERSION } = config;
const apiPrefix = `/${API_VERSION}/`;

export default ({ app }: { app: Express }): void => {
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');
  app.use(metricsMiddleware);
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  app.use('/admin/queues', UI);
  app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
    return res.send(
      swaggerUi.generateHTML(await import('../../../build/swagger.json'))
    );
  });

  /**
   * Health Check endpoints
   */
  app.get(`${apiPrefix}status`, (_, res) => {
    res.status(200).end();
  });
  app.head(`${apiPrefix}status`, (_, res) => {
    res.status(200).end();
  });

  // register routes
  RegisterRoutes(app);
  // Log All requests

  // catch 404 and forward to error handler
  app.use(middleware.notFoundError);
  app.use(middleware.sendError);
};
