import puppeteer from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
export const connect = async () => {
  try {
    puppeteer.use(stealthPlugin());
    return await puppeteer.connect({
      browserWSEndpoint: 'ws://localhost:3000',
    });
  } catch (e) {
    console.error('Failed to connect to docker container, is it running?');
    throw e;
  }
};
