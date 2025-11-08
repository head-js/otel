import { datafluxRum } from './dataflux-rum.js';


export default function guancecom(
  // analytics: any,
  settings?: any,
  // integrations?: any
): any {
  const defaultOptions = {
    traceType: 'jaeger',
    trackInteractions: true,
  };

  const uniOptions = {
    service: settings.app.service,
    version: settings.app.version,
    env: settings.app.profile,
  };

  const sdkOptions = {
    applicationId: settings.id,
    // settings.token
    datakitOrigin: settings.endpoint,
  };

  const rumOptions = { ...settings.rum };

  if (rumOptions.beforeSend) {
    // @ts-ignore
    sdkOptions.beforeSend = rumOptions.beforeSend;
  }

  function isDeny(event: any): boolean {
    if (event.type === 'resource') {
      const origins = rumOptions.denyResourceOrigins;
      for (let i = 0; i < origins.length; i += 1) {
        if (event.resource.url.indexOf(origins[i]) > 0) {
          return true;
        }
      }
    }
    return false;
  }
  if (rumOptions.denyResourceOrigins && rumOptions.denyResourceOrigins.length > 0) {
    // @ts-ignore
    if (sdkOptions.beforeSend) {
      // @ts-ignore
      const that = sdkOptions.beforeSend;
       // @ts-ignore
      sdkOptions.beforeSend = function (event, context) {
        if (isDeny(event)) { return false; }
        if (that(event, context) === false) { return false; }
      };
    } else {
    // @ts-ignore
    sdkOptions.beforeSend = function (event, context) {
      if (isDeny(event)) { return false; }
    };
    }
  }

  const options = {
    ...defaultOptions,
    ...uniOptions,
    ...sdkOptions,
    ...settings,
  };

  datafluxRum.init(options);

  function transform(event) {
    const {
      context: { page },
      messageId,
      anonymousId,
      type,
      properties,
      timestamp,
      // sentAt
      // integrations,
    } = event;
    return { messageId, anonymousId, type, properties, timestamp };
  }

  async function addAction(ctx: any): Promise<any> {
    const event = transform(ctx.event);
    datafluxRum.addAction(ctx.event.event, event);
    return Promise.resolve();
  }

  const guancecom: any = {
    name: 'Guance.com',
    type: 'destination',
    version: '3.2.24-7',
    isLoaded: (): boolean => true,
    load: (): Promise<void> => Promise.resolve(),
    track: addAction,
    // identify: send,
    page: (): Promise<void> => Promise.resolve(),
    // alias: send,
    // group: send,
  }

  return guancecom
}
