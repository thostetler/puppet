import { Page } from 'puppeteer';
import { connect } from '../connect';
const URL =
  'https://www.microcenter.com/product/630282/amd-ryzen-9-5950x-vermeer-34ghz-16-core-am4-boxed-processor';
export const run = async () => {
  const browser = await connect();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1800 });
  console.log('Checking Microcenter for 5950X availability');
  await checkStore(page, StoreId.PARKVILLE);
  await checkStore(page, StoreId.ROCKVILLE);
  await browser.close();
};

const checkInventory = async (page: Page) => {
  return await page.$eval('.inventory', el => el.textContent?.trim());
};

enum StoreId {
  ROCKVILLE = '085',
  PARKVILLE = '125',
}

const checkStore = async (page: Page, id: StoreId) => {
  await page.goto(`${URL}?storeid=${id}`);
  const inv = await checkInventory(page);
  console.log(inv);
};
