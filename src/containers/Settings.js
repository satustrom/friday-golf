import React, { useState } from 'react';
import { Observer } from 'mobx-react-lite';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MaterialUISlider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import MaterialUICheckbox from '@material-ui/core/Checkbox';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import ReplayIcon from '@material-ui/icons/Replay';
import CheckIcon from '@material-ui/icons/Check';
import Icon from '@material-ui/core/Icon';

import useStore from '../hooks/store';

import Modal from '../components/Modal';

export default function Settings({ onPointsEnabledChange }) {
  const classes = useStyles();
  const store = useStore('settings');
  const [isOpen, setIsOpen] = useState(false);
  const [points, setPoints] = useState(store.pointRanges);
  const [rules, setRules] = useState(store.rules);

  const handleSetPoints = points => {
    setPoints(points);
  };

  const handleSetRules = rules => {
    setRules(rules);
  };

  const reset = () => {
    setPoints(store.pointRanges);
    setRules(store.rules);
  };

  const handleClose = save => {
    setIsOpen(false);

    // Reset the values if changes don't want to be saved
    if (save) {
      store.updatePoints(points);
      store.updateRules(rules);
      onPointsEnabledChange(rules.isPointsEnabled);
    } else {
      reset();
    }
  };

  // TODO v2.0. Possibility to name ranges instead of big/small/miss
  // TODO v2.0. Possibility to select amount of randomizers
  return (
    <Observer>
      {() => (
        <>
          <Box position="absolute" top="4px" right="10px">
            <IconButton onClick={() => setIsOpen(true)}>
              <Icon className={classes.settings}>settings</Icon>
              <Box
                display={['none', 'none', 'inline']}
                color="white"
                ml="6px"
                fontFamily="Catamaran"
                fontWeight="700"
              >
                Settings
              </Box>
            </IconButton>
          </Box>

          <Modal header="Settings" isOpen={isOpen} onClose={() => handleClose(false)} pb={0} px={0}>
            <Box px={3}>
              <h2>Points randomizer</h2>
              <FormControlLabel
                control={
                  <Checkbox
                    id="not-same"
                    checkedIcon={<EmojiEmotionsIcon />}
                    name="not-same-check"
                    checked={rules.isPointsEnabled}
                    onChange={() =>
                      handleSetRules({ ...rules, isPointsEnabled: !rules.isPointsEnabled })
                    }
                  />
                }
                label="Enable points randomizer"
                className={classes.form}
              ></FormControlLabel>

              <h3>Ranges</h3>
              <Box my={2}>
                <p>Select min and max values</p>
              </Box>

              <Box display="grid" style={{ gridTemplateColumns: '60px auto' }} mb={1}>
                <h4>Big</h4>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  flexGrow={2}
                  mx={5}
                >
                  <Box display="flex" justifyContent="space-between">
                    <p>{points.big[0]}</p>
                    <p>{points.big[1]}</p>
                  </Box>
                  <Slider
                    min={-50}
                    max={50}
                    value={points.big}
                    onChange={(event, newValue) => handleSetPoints({ ...points, big: newValue })}
                    disabled={!rules.isPointsEnabled}
                  />
                </Box>
              </Box>

              <Box display="grid" style={{ gridTemplateColumns: '60px auto' }} mb={1}>
                <h4>Small</h4>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  flexGrow={2}
                  mx={5}
                >
                  <Box display="flex" justifyContent="space-between">
                    <p>{points.small[0]}</p>
                    <p>{points.small[1]}</p>
                  </Box>
                  <Slider
                    min={-50}
                    max={50}
                    value={points.small}
                    onChange={(event, newValue) => handleSetPoints({ ...points, small: newValue })}
                    disabled={!rules.isPointsEnabled}
                  />
                </Box>
              </Box>

              <Box display="grid" style={{ gridTemplateColumns: '60px auto' }} mb={1}>
                <h4>Miss</h4>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  flexGrow={2}
                  mx={5}
                >
                  <Box display="flex" justifyContent="space-between">
                    <p>{points.miss[0]}</p>
                    <p>{points.miss[1]}</p>
                  </Box>
                  <Slider
                    min={-50}
                    max={50}
                    value={points.miss}
                    onChange={(event, newValue) => handleSetPoints({ ...points, miss: newValue })}
                    disabled={!rules.isPointsEnabled}
                  />
                </Box>
              </Box>

              <h3>Rules</h3>

              <FormControlLabel
                mt={2}
                control={
                  <Checkbox
                    id="avoid-null"
                    checkedIcon={<EmojiEmotionsIcon />}
                    name="avoid-null-check"
                    checked={rules.avoidNull}
                    onChange={() => handleSetRules({ ...rules, avoidNull: !rules.avoidNull })}
                    className={classes.checkbox}
                    disabled={!rules.isPointsEnabled}
                  />
                }
                label="Skip zero"
              ></FormControlLabel>

              <FormControlLabel
                control={
                  <Checkbox
                    id="not-same"
                    checkedIcon={<EmojiEmotionsIcon />}
                    name="not-same-check"
                    checked={rules.notSameNumber}
                    onChange={() =>
                      handleSetRules({ ...rules, notSameNumber: !rules.notSameNumber })
                    }
                    disabled={!rules.isPointsEnabled}
                  />
                }
                label="Not same numbers in a row"
                className={classes.form}
              ></FormControlLabel>
            </Box>

            <Box
              position="sticky"
              bottom={0}
              display="flex"
              justifyContent="space-between"
              bgcolor="#202020"
            >
              <IconButton onClick={reset}>
                <ReplayIcon fontSize="large" className={classes.cancel} />
              </IconButton>

              <IconButton onClick={() => handleClose(true)}>
                <CheckIcon fontSize="large" className={classes.check} />
              </IconButton>
            </Box>
          </Modal>
        </>
      )}
    </Observer>
  );
}

const Slider = withStyles({
  root: {
    color: '#fcd13f',
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit'
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)'
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(MaterialUISlider);

const Checkbox = withStyles({
  root: {
    color: 'white',
    '&$checked': {
      color: '#fbbe39'
    }
  },
  checked: {}
})(props => <MaterialUICheckbox color="default" {...props} />);

const useStyles = makeStyles({
  check: {
    color: '#22bb33',
    fontSize: '2rem'
  },
  settings: {
    color: '#ffffff',
    fontSize: '2rem'
  },
  cancel: {
    color: '#d11a2a',
    fontSize: '2rem'
  },
  close: {
    color: '#D0D0D0',
    fontSize: '1.5rem'
  },
  form: {
    display: 'block'
  },
  checkbox: {
    root: {
      color: 'green',
      '&$checked': {
        color: '#fbbe39'
      }
    }
  }
});
