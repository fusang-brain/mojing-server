// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportErrorHandler from '../../../app/middleware/ErrorHandler';
import ExportLoadEnterprise from '../../../app/middleware/LoadEnterprise';
import ExportNotfoundHandler from '../../../app/middleware/NotfoundHandler';

declare module 'egg' {
  interface IMiddleware {
    errorHandler: typeof ExportErrorHandler;
    loadEnterprise: typeof ExportLoadEnterprise;
    notfoundHandler: typeof ExportNotfoundHandler;
  }
}
