import FurhatCore from 'furhat-core'

let portNumber
let callbackFun

const InitCallback = (status, hat) => {
  if (status === 'open') {
    hat.send({
      event_name: 'furhatos.senses.SenseSkillGUIConnected',
      port: portNumber,
    })
    callbackFun(hat)
  }
}

/**
 * FurhatGUI Function which sets up a connection to the furhat skill and gives
 * the furhat object to send and recieve events to the skill.
 * @param callback callback that needs to be triggered when a sucessful connection is established
 */
const FurhatGUI = (callback) => {
  if (callback !== undefined && typeof callback === 'function') {
    window.fetch('/port', { method: 'GET' }).then((r) => { // eslint-disable-line no-undef
      r.json().then((o) => {
        const furhat = new FurhatCore()
        portNumber = o.port
        callbackFun = callback
        furhat.init(o.address, o.port, 'api', InitCallback) // eslint-disable-line no-undef
      })
    })
  }
}

export default FurhatGUI
