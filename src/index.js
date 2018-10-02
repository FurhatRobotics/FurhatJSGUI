import FurhatCore from 'furhat-core'

let address
let portNumber
let callbackFun

const InitCallback = (status, hat) => {
  if (status === 'open') {
    hat.send({
      event_name: 'furhatos.event.senses.SenseSkillGUIConnected',
      port: portNumber,
    })
    callbackFun(hat)
  } else if (status === 'closed' || status === 'failed') {
    console.log('Trying to reestablish connection to Furhat') // eslint-disable-line no-console
    hat.init(address, portNumber, 'api', InitCallback)
  }
}

/**
 * FurhatGUI Function which sets up a connection to the furhat skill and gives
 * the furhat object to send and recieve events to the skill.
 * @param callback callback that needs to be triggered when a sucessful connection is established
 * @return Promise that will return the promise of the connection
 */
const FurhatGUI = (callback) => {
  if (callback !== undefined && typeof callback === 'function') {
    return window.fetch('/port', { method: 'GET' }).then(r =>
      // eslint-disable-line no-undef
      r.json().then((o) => {
        const furhat = new FurhatCore()
        address = o.address // eslint-disable-line prefer-destructuring
        portNumber = o.port
        callbackFun = callback
        furhat.init(o.address, o.port, 'api', InitCallback) // eslint-disable-line no-undef
      }))
  }
}

export default FurhatGUI
