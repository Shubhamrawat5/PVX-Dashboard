import { IncomingMessage } from 'http';

class Utility {
  apiPath = (req: IncomingMessage) => {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const fullUrl = `${protocol}://${host}/api${req.url}`;
    return fullUrl;
  };
}
const util = new Utility();

export default util;
