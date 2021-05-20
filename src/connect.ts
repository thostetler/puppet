import puppeteer from 'puppeteer';
export const connect = async () => {
  try {
    return await puppeteer.connect({
      browserWSEndpoint: 'ws://localhost:3000',
    });
  } catch (e) {
    console.error('Failed to connect to docker container, is it running?');
    throw e;
  }
};
