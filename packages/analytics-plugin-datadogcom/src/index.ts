import { datadogRum } from '@datadog/browser-rum-slim';


export default function datadog(
  // analytics: any,
  settings?: any,
  // integrations?: any
): any {
  const defaultOptions = {
  };

  const uniOptions = {
    service: settings.app.service,
    version: settings.app.version,
    env: settings.app.profile,
  };

  const sdkOptions = {
    applicationId: settings.id,
    clientToken: settings.token,
    site: settings.endpoint,
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

  datadogRum.init(options);

  async function addAction(ctx: any): Promise<any> {
    const event = ctx.event;
    datadogRum.addAction(event.event, event);
    return Promise.resolve();
  }

  const plugin: any = {
    name: 'Datadog.com',
    type: 'destination',
    version: '5.35.0-1',
    isLoaded: (): boolean => true,
    load: (): Promise<void> => Promise.resolve(),
    track: addAction,
    // identify: send,
    page: (): Promise<void> => Promise.resolve(),
    // alias: send,
    // group: send,
  }

  return plugin;
}