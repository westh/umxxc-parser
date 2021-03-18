import { Parser } from 'binary-parser'

const MODEL_HEX_TO_MODEL_NAME = {
  2403: 'UM24C',
  2505: 'UM25C',
  3404: 'UM34C'
}

const umxxcParser = new Parser()
  .int16('model', { formatter: modelNumber => MODEL_HEX_TO_MODEL_NAME[modelNumber] || 'unknown' })
  .int16('voltage', { formatter: voltage => voltage / 100 })
  .int16('current')
  .int32('power')
  .nest('temperature', {
    type: new Parser()
      .int16('celsius')
      .int16('fahrenheit')
  })
  .int16('selectedGroup')
  .array('groups', {
    type: new Parser()
      .int32('accumulateCurrent')
      .int32('accumulatePower'),
    length: 10
  })
  .int16('usbDataPlus', { formatter: voltage => voltage / 100 })
  .int16('usbDataMinus', { formatter: voltage => voltage / 100 })
  .int16('chargingMode')
  .int32('accumulatedCurrent')
  .int32('accumulatedPower')
  .int16('thresholdCurrent', { formatter: voltage => voltage / 100 })
  .int32('accumulatedTime')
  .int16('connected')
  .int16('screenTimeout')
  .int16('screenBrightness')
  .int32('resistance', { formatter: resistance => resistance / 10 })
  .int16('screenMode')
  .buffer('unknown', { length: 4 })

export default umxxcParser
