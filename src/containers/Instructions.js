import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Link from '@material-ui/core/Link';

import Modal from '../components/Modal';

export default function Instructions() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Box position="absolute" top="4px" left="10px">
        <IconButton onClick={() => setIsOpen(true)}>
          <Icon className={classes.settings}>help</Icon>
          <Box
            display={['none', 'none', 'inline']}
            color="white"
            ml="6px"
            fontFamily="Catamaran"
            fontWeight="700"
          >
            Info
          </Box>
        </IconButton>
      </Box>

      <Modal header="Welcome to play Friday golf!" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Box my={2}>
          <Typography component="p">
            Here you can find all the information you need in order to play. Remember to have fun
            and enjoy the ride, winning is just a secondary matter!
          </Typography>
          {/* <Box my={2}>
            <ExpansionCard header="What do I need to have?">
              <Typography mr="2px" component="span">
                The most important thing is a mini golf set. If you are unsure what that is, see
                example of one{' '}
              </Typography>
              <Link
                href="https://5.imimg.com/data5/AF/BH/AK/SELLER-41330824/golf-set-f-500x500.jpg"
                target="_blank"
                style={{ color: '#ffffff' }}
              >
                here.
              </Link>
              <Typography mr="2px" component="span">
                {' '}
                Secondly, playing will become much easier if you have a golf club. There are also
                some special items requested in game changers, but you can always replace them or
                skip the game changer.
              </Typography>
            </ExpansionCard>
            <ExpansionCard header="How to play?">
              <Typography>
                First you need something to write on. Draw a leadboard (rows: players' names,
                columns: x amount of rounds and total). Then as a team you need to decide how many
                game changers will you have and in which rounds those will be played. For example we
                usually have had 10 rounds and 3 game changers which have been played on rounds 3, 6
                and 9. <br />
                Now it's time to go to the settings to select the rest. <br />
                <strong>More instructions to come!</strong>
              </Typography>
            </ExpansionCard>
          </Box> */}
        </Box>
      </Modal>
    </>
  );
}

// TODO: Write better instructions
// const ExpansionCard = ({ header, children, id }) => (
//   <ExpansionPanel square={false} style={{ backgroundColor: '#383838', color: '#ffffff' }}>
//     <ExpansionPanelSummary
//       expandIcon={<Icon style={{ color: '#ffffff' }}>expand_more</Icon>}
//       id={id}
//     >
//       <Typography variant="h6">{header}</Typography>
//     </ExpansionPanelSummary>
//     <ExpansionPanelDetails style={{ display: 'inline-block' }}>{children}</ExpansionPanelDetails>
//   </ExpansionPanel>
// );

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
        color: 'white'
      }
    }
  }
});
