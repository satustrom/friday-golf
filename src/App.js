import React, { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Observer, useObserver } from 'mobx-react-lite';

import Box from '@material-ui/core/Box';
import styled, { createGlobalStyle } from 'styled-components';

import useChangers from './hooks/changers';
import useStore from './hooks/store';

import Randomizer from './containers/Randomizer';
import Settings from './containers/Settings';
import Instructions from './containers/Instructions';
import GameChanger from './containers/GameChanger';

import Button from './components/Button';

function App() {
  const changers = useChangers();
  const store = useStore('gameChanger');
  const settingsStore = useStore('settings');
  const [isPointsEnabled, setIsPointsEnabled] = useState(settingsStore.rules.isPointsEnabled);

  // TODO v2.0. Animation when max points reached
  return (
    <>
      <Global />
      <Box display="flex" justifyContent="center" as="header">
        <Heading>Friday Golf</Heading>
      </Box>

      <Settings onPointsEnabledChange={value => setIsPointsEnabled(value)} />
      <Instructions />

      <Box display="flex" alignItems="center" justifyContent="center" mt={6}>
        <Button onClick={() => store.randomizeChanger(changers)} disabled={isEmpty(changers)}>
          Randomize game changer
        </Button>
      </Box>

      <Wrapper>
        <GameChanger changers={changers} />
        {isPointsEnabled && <Randomizer />}
      </Wrapper>
    </>
  );
}

const Heading = styled.h1`
  font-family: 'Monoton', cursive;
  font-size: 20px;
  color: #fcd13f;
  margin: 0;

  text-align: center;

  @media only screen and (min-width: 600px) {
    font-size: 30px;
  }

  @media only screen and (min-width: 1024px) {
    font-size: 50px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;

  flex-direction: column;

  @media only screen and (min-width: 1024px) {
    flex-direction: row;
  }
`;

const Global = createGlobalStyle`
  html, body {
    background-color: #0b0b0b;
    margin-top: 10px;
    font-family: 'Catamaran', sans-serif;
  }
`;

export default App;
