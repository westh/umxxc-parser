const umxxcParser = require('./lib/cjs/index.js')

console.log('=== commonjs test ===')

const messageUnderTest = Buffer.from(
  '0d4c01e40019000000790017004a0000000000020000000a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400030007000000020000000a00000000018600010001000300000790000215d4',
  'hex'
)

console.log(umxxcParser.parse(messageUnderTest))

/*
should output this:

{
  model: 'UM34C',
  voltage: 4.84,
  current: 25,
  power: 121,
  temperature: { celsius: 23, fahrenheit: 74 },
  selectedGroup: 0,
  groups: [
    { acummulatedCurrent: 2, acummulatedPower: 10 },
    { acummulatedCurrent: 0, acummulatedPower: 0 },
    { acummulatedCurrent: 0, acummulatedPower: 0 },
    { acummulatedCurrent: 0, acummulatedPower: 0 },
    { acummulatedCurrent: 0, acummulatedPower: 0 },
    { acummulatedCurrent: 0, acummulatedPower: 0 },
    { acummulatedCurrent: 0, acummulatedPower: 0 },
    { acummulatedCurrent: 0, acummulatedPower: 0 },
    { acummulatedCurrent: 0, acummulatedPower: 0 },
    { acummulatedCurrent: 0, acummulatedPower: 0 }
  ],
  usbDataPlus: 0.04,
  usbDataMinus: 0.03,
  chargingMode: 7,
  accumulatedCurrent: 2,
  accumulatedPower: 10,
  thresholdCurrent: 0,
  accumulatedTime: 390,
  connected: 1,
  screenTimeout: 1,
  screenBrightness: 3,
  resistance: 193.6,
  screenMode: 2,
  unknown: <Buffer 15 d4>
}
*/
