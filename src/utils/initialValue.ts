import store from 'store';

export function initialPointRange(param: 'big' | 'small' | 'miss') {
  const savedPoints = store.get('points');

  if (savedPoints) {
    return savedPoints[param];
  }

  return [-50, 50];
}

export function initialRule(param: 'isPointsEnabled' | 'avoidNull' | 'notSameNumber') {
  const savedRule = store.get('rules');

  if (savedRule) {
    return savedRule[param];
  }

  return false;
}
