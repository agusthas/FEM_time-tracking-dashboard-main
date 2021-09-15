// CSS
import './style.css';

// TS
import { Data, Timeframes } from './types';
import { fetchData } from './api';

function updateUI(data: Data[]): void {
  // grab grid container
  const gridContainer = document.querySelector(
    '.grid-container'
  )! as HTMLDivElement;

  // reset children except the first child
  const firstChild = gridContainer.firstElementChild!;
  gridContainer.innerHTML = '';
  gridContainer.append(firstChild);

  // get button value as keyof Timeframes
  const currentTimeFrame = (
    document.querySelector('button.selected')! as HTMLButtonElement
  ).value as keyof Timeframes;

  // loop data to update(append) UI
  data.forEach((item) => {
    gridContainer.insertAdjacentHTML(
      'beforeend',
      createCardElement(currentTimeFrame, item)
    );
  });
}

// Create a card
const createCardElement = (type: keyof Timeframes, item: Data) => {
  let text: string = '';

  switch (type) {
    case 'daily':
      text = 'Day';
      break;

    case 'weekly':
      text = 'Week';
      break;

    case 'monthly':
      text = 'Month';
      break;

    default:
      break;
  }

  return `
  <div class="card ${item.title.toLowerCase().replace(' ', '-')}">
    <div class="data-wrapper">
      <div class="title">
        <h2>${item.title}</h2>
        <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg></div>
      <div class="time">
        <h2 class="curr-time">${'' + item.timeframes[type].current}hrs</h2>
        <span class="prev-time">Last ${text} - ${
    '' + item.timeframes[type].previous
  }hrs</span>
      </div>
    </div>
  </div>
`;
};

// add event listener for buttons
function addButtonEvents(data: Data[]): void {
  const buttons = document.querySelectorAll('.timeframe li button');
  buttons.forEach((button) => {
    button.addEventListener('click', (ev) => {
      const targetButton = ev.target as HTMLButtonElement;
      document.querySelector('button.selected')!.classList.remove('selected');

      targetButton.classList.add('selected');
      updateUI(data);
    });
  });
}

// Fetch data for first time
const BASE_URL = import.meta.env.BASE_URL; // will be the base URL from vite.config.ts
fetchData<Data[]>(`${BASE_URL}/data.json`)
  .then((data) => {
    updateUI(data);
    addButtonEvents(data);
  })
  .catch((error) => {
    alert(error);
  });
