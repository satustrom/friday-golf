import { action, autorun, computed, decorate, observable } from 'mobx';
import store from 'store';

import { randomBig, randomSmall, randomMiss } from '../utils/random';
import { initialPointRange, initialRule } from '../utils/initialValue';

export interface SettingsStore {
  bigHoleRange: number[];
  smallHoleRange: number[];
  missRange: number[];
  rules: Rules;
  randomizedPoints: number[];
}

export interface Rules {
  isPointsEnabled: boolean;
  avoidNull: boolean;
  notSameNumber: boolean;
}

export class Settings {
  // Point ranges
  bigHoleRange = initialPointRange('big');
  smallHoleRange = initialPointRange('small');
  missRange = initialPointRange('miss');

  // Rules
  isPointsEnabled = initialRule('isPointsEnabled');
  avoidNull = initialRule('avoidNull');
  notSameNumber = initialRule('notSameNumber');

  // Randomized points
  randomizedPoints = [0, 0, 0];

  constructor() {
    autorun(() => [this.bigHoleRange, this.smallHoleRange, this.missRange]);
  }

  // FIXME: Keep naming consistent
  updatePoints = (points: any) => {
    store.set('points', points);

    this.bigHoleRange = points.big;
    this.smallHoleRange = points.small;
    this.missRange = points.miss;
  };

  updateRules = (rules: Rules) => {
    store.set('rules', rules);

    this.isPointsEnabled = rules.isPointsEnabled;
    this.avoidNull = rules.avoidNull;
    this.notSameNumber = rules.notSameNumber;
  };

  randomize = () => {
    this.randomizedPoints = [randomBig(this), randomSmall(this), randomMiss(this)];
  };

  get pointRanges() {
    return {
      big: this.bigHoleRange,
      small: this.smallHoleRange,
      miss: this.missRange
    };
  }

  get rules() {
    return {
      isPointsEnabled: this.isPointsEnabled,
      avoidNull: this.avoidNull,
      notSameNumber: this.notSameNumber
    };
  }
}

decorate(Settings, {
  bigHoleRange: observable,
  smallHoleRange: observable,
  missRange: observable,

  pointRanges: computed,
  rules: computed,

  updatePoints: action,
  updateRules: action,

  randomize: action,
  randomizedPoints: observable
});
