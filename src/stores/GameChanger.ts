import { action, observable, decorate } from 'mobx';
import store from 'store';

export interface GameChangerStore {
  selectedIndex: number;
  isOpen: boolean;
}

export class GameChanger {
  selectedIndex = 0;
  isOpen = false;

  close = () => {
    this.isOpen = false;
  };

  randomizeChanger = (changers: any) => {
    let newValue;

    // Check already used ones from local store
    let usedValues = store.get('changers') || [];

    if (Object.keys(changers).length === usedValues.length) {
      usedValues = [];
    }

    do {
      newValue = Math.floor(Math.random() * (Object.keys(changers).length - 1 + 1) + 0);
    } while (usedValues.includes(newValue));

    usedValues.push(newValue);
    store.set('changers', usedValues);

    if (this.isOpen === false) {
      this.isOpen = true;
    }
    this.selectedIndex = newValue;
  };
}

decorate(GameChanger, {
  isOpen: observable,
  selectedIndex: observable,
  close: action,
  randomizeChanger: action
});
