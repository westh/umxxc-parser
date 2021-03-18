# @westh/umxxc-parser

Parse messages from UMxxC devices, that is for instance the UM24C, UM25C, or the UM34C.

This parser is a derivative of these guys' work:

- [bzgex/UM34C_BT](https://github.com/bzgec/UM34C_BT)
- [kolinger/rd-usb](https://github.com/kolinger/rd-usb)
- [sebastianha/um34c](https://github.com/sebastianha/um34c)

Whereas the above repos provide a complete 'suite' for getting and parsing the data from a UMxxC device this is merely the parser.

## Installation

```
npm install @westh/umxxc-parser
```

## Usage

```javascript
const umxxcParser = require('@westh/umxxc-parser')

const messageToBeParsed = Buffer.from('...') // ...however you get your data from the UMxxC device
const parsedMessage = umxxcParser.parse(messageToBeParsed)
```

The `parsedMessage` will contain something that looks like the following:

```javascript
{
  model: 'UM34C',
  voltage: 4.84, // [V] for UM25C this value will be decivolts
  current: 25, // [mA] for UM25C this value will be tenth-milliamps
  power: 121, // [mW]
  temperature: {
    celsius: 23,
    fahrenheit: 74
  },
  selectedGroup: 0,
  groups: [
    { accumulatedCurrent: 2, accumulatedPower: 10 }, // [mAh] [mWh]
    { accumulatedCurrent: 0, accumulatedPower: 0 },
    { accumulatedCurrent: 0, accumulatedPower: 0 },
    { accumulatedCurrent: 0, accumulatedPower: 0 },
    { accumulatedCurrent: 0, accumulatedPower: 0 },
    { accumulatedCurrent: 0, accumulatedPower: 0 },
    { accumulatedCurrent: 0, accumulatedPower: 0 },
    { accumulatedCurrent: 0, accumulatedPower: 0 },
    { accumulatedCurrent: 0, accumulatedPower: 0 },
    { accumulatedCurrent: 0, accumulatedPower: 0 }
  ],
  usbDataPlus: 0.04, // [V]
  usbDataMinus: 0.03, // [V]
  chargingMode: 7,
  accumulatedCurrent: 2, // [mAh]
  accumulatedPower: 10, // [mWh]
  thresholdCurrent: 0, // [A] and is the threshold at which accumulated... is captured
  accumulatedTime: 390, // [s]
  connected: 1,
  screenTimeout: 1,
  screenBrightness: 3,
  resistance: 193.6, // [Ω]
  screenMode: 2,
  unknown: <Buffer 15 d4>
}
```

## Description

Basically the parser does what is described below to whatever `Buffer` you might throw at it. The calculations mentioned in the 'Meaning' column are taken care of, *except for the edge cases for the UM25C which are not handled at the moment*.

| Offset | Length | Type             | Meaning                                                      |
| ------ | ------ | ---------------- | ------------------------------------------------------------ |
| 0      | 2      | model            | Model ID                                                     |
| 2      | 2      | measurement      | Voltage - UM25C: millivolts (divide by 1000 to get V), UM24C/UM34C: centivolts (divide by 100 to get V) |
| 4      | 2      | measurement      | Amperage - UM25C tenth-milliamps (divide by 10000 to get A), UM24C/UM34C: milliamps (divide by 1000 to get A) |
| 6      | 4      | measurement      | Wattage (in mW, divide by 1000 to get W)                     |
| 10     | 2      | measurement      | Temperature (in Celsius)                                     |
| 12     | 2      | measurement      | Temperature (in Fahrenheit)                                  |
| 14     | 2      | configuration    | Currently selected data group, zero-indexed                  |
| 16     | 80     | measurement      | Array of 10 main capacity data groups (where the first one, group  0, is the ephemeral one) -- for each data group: 4 bytes mAh, 4 bytes  mWh |
| 96     | 2      | measurement      | USB data line voltage (positive) in centivolts (divide by 100 to get V) |
| 98     | 2      | measurement      | USB data line voltage (negative) in centivolts (divide by 100 to get V) |
| 100    | 2      | measurement      | Charging mode index                                          |
| 102    | 4      | measurement      | mAh from threshold-based recording                           |
| 106    | 4      | measurement      | mWh from threshold-based recording                           |
| 110    | 2      | configuration    | Currently configured threshold for recording (in centiamps, divide by 100 to get A) |
| 112    | 4      | measurement      | Duration of threshold recording, in cumulative seconds       |
| 116    | 2      | configuration    | Threshold recording active (1 if recording, 0 if not)        |
| 118    | 2      | configuration    | Current screen timeout setting, in minutes (0-9, 0 is no screen timeout) |
| 120    | 2      | configuration    | Current backlight setting (0-5, 0 is dim, 5 is full brightness) |
| 122    | 4      | measurement      | Resistance in deci-ohms (divide by 10 to get ohms)           |
| 126    | 2      | configuration    | Current screen (zero-indexed, same order as on device)       |
| 128    | 1      | unknown          |                                                              |
| 129    | 1      | checksum/unknown | Checksum (UM34C) or unknown                                  |

Source [RDTech UM series by sigrok](https://sigrok.org/wiki/RDTech_UM_series).

## Testing

Running `yarn test` will first run `yarn build` and then test both the CommonJS and ESM version.

## License

GPL-3.0
