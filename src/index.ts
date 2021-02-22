import Furhat, { Event, EventCallback } from 'furhat-core'

let furhat: Furhat
let portNumber: string

/**
 * FurhatGUI Function which sets up a connection to the furhat skill and gives
 * the furhat object to send and recieve events to the skill.
 * @return Promise that will return the promise with a `Furhat` obkect
 */
const FurhatGUI: () => Promise<Furhat> = () => new Promise((resolve, reject) => {
  window.fetch('/port', { method: 'GET' }) // eslint-disable-line no-undef
    .then(r => r.json())
    .then(({address, port}) => {
      portNumber = port
      furhat = new Furhat(address, port, 'api')
      return furhat.init()
    })
    .then(() => {
      const senseSkillGuiEvent: Event = {
        event_name: 'furhatos.event.senses.SenseSkillGUIConnected',
        port: portNumber,
      }
      furhat.send(senseSkillGuiEvent)
      resolve(furhat)
    })
    .catch((error) => reject(`Something went wrong: ${error}`))
})

// Re-exporting types from Core
export { Furhat, Event, EventCallback }

export default FurhatGUI
