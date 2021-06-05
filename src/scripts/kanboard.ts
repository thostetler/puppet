import fs from 'fs';
import path from 'path';
import { Page } from 'puppeteer';
import { connect } from '../connect';
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');
const URL = 'https://kanboard.adslabs.org/';
export const run = async () => {
  const browser = await connect();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1800 });
  await page.goto(URL, { waitUntil: 'networkidle2' });
  await login(page);
  await openBoardView(page);
  await createBulkTasks(page, tasks);
  await takeScreenshot(page, 'kanban');
  await browser.close();
};

const createBulkTasks = async (page: Page, tasks: TaskOptions[]) => {
  for (let task of tasks) {
    await createTask(page, task);
  }
};

const login = async (page: Page) => {
  await page.waitForSelector('input');
  await page.type('input[type=text]', 'Tim');
  await page.type('input[type=password]', 'aMtVfJM23KqbS8p9O');
  await page.click('button[type=submit]');
};

const openBoardView = async (page: Page) =>
  await page.goto(
    'https://kanboard.adslabs.org/?controller=BoardViewController&action=show&project_id=1',
    { waitUntil: 'networkidle2' }
  );

const openNewTaskModal = async (page: Page) => {
  await page.waitForSelector('div.board-add-icon > a');
  await page.click('div.board-add-icon > a');
};

const takeScreenshot = async (page: Page, name: string) => {
  await page.waitForTimeout(2000);
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR);
  }
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, `${name}.png`),
  });
};

enum Column {
  Backlog = 1,
  Ready = 2,
  WorkInProgress = 3,
  Done = 4,
}
export interface TaskOptions {
  title: string;
  description: string;
  points?: number;
  column?: Column;
  priority?: 0 | 1 | 2 | 3;
}
const createTask = async (page: Page, options: TaskOptions) => {
  const {
    title,
    description,
    points = 1,
    column = Column.Backlog,
    priority = 0,
  } = options;

  await openNewTaskModal(page);

  await page.waitForSelector('#modal-box input[name=title]');
  await page.type('#modal-box input[name=title]', title);

  await page.waitForSelector('#modal-box textarea[name=description]');
  await page.type('#modal-box textarea[name=description]', description);

  await page.waitForSelector('#modal-box input[name=score]');
  await page.type('#modal-box input[name=score]', points.toString());

  await page.waitForSelector('#modal-box select[name=column_id]');
  await page.select('#modal-box select[name=column_id]', column.toString());

  await page.waitForSelector('#modal-box select[name=priority]');
  await page.select('#modal-box select[name=priority]', priority.toString());

  await page.waitForSelector('#modal-box form');
  await page.$eval('#modal-box form', form =>
    (form as HTMLFormElement).submit()
  );

  console.log('created task', title);
};

const tasks: TaskOptions[] = [{ title: '', description: '', points: 1 }];
