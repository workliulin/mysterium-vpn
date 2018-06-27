/*
 * Copyright (C) 2017 The "MysteriumNetwork/mysterion" Authors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// @flow
import {ipcRenderer} from 'electron'
import type { MessageBus, MessageBusCallback } from './messageBus'

class RendererMessageBus implements MessageBus {
  _listeners: { [MessageBusCallback]: ?MessageBusCallback } = {}

  send (channel: string, data?: mixed): void {
    ipcRenderer.send(channel, data)
  }

  on (channel: string, callback: MessageBusCallback): void {
    const listener = (event, data) => {
      callback(data)
    }
    ipcRenderer.on(channel, listener)
    this._listeners[callback] = listener
  }

  removeCallback (channel: string, callback: MessageBusCallback): void {
    const listener = this._listeners[callback]
    if (!listener) {
      throw new Error(`Removing callback for '${channel}' message in renderer failed - callback was not found`)
    }
    ipcRenderer.removeListener(channel, listener)
    this._listeners[callback] = undefined
  }
}

export default RendererMessageBus
