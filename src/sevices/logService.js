import * as Sentry from '@sentry/react';
import {Integrations} from '@sentry/tracing'

function init(){
    Sentry.init({
        dsn: "https://3356fa240eb6495ab878f32f46830192@o498143.ingest.sentry.io/5575352",
        autoSessionTracking: true,
        integrations: [
          new Integrations.BrowserTracing(),
        ],
      
        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: 1.0,
      });
}

function log(error){
    Sentry.captureException(error)
}

export default {
    init,
    log
}