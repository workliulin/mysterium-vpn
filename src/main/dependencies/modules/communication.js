/*
 * Copyright (C) 2018 The "mysteriumnetwork/mysterium-vpn" Authors.
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
import IpcMessageBus from '../../../app/communication/ipc-message-bus'
import MainBufferedIpc from '../../../app/communication/ipc/main-buffered-ipc'
import SyncCallbacksInitializer from '../../../app/sync-callbacks-initializer'
import { SyncIpcReceiver } from '../../../app/communication/sync/sync-ipc'
import SyncReceiverMainCommunication from '../../../app/communication/sync/sync-main-communication'
import type { Container } from '../../../app/di'
import CommunicationBindings from '../../../app/communication-bindings'
import { buildMainCommunication } from '../../../app/communication/main-communication'

function bootstrap (container: Container) {
  container.factory(
    'mainIpc',
    ['bugReporter'],
    (bugReporter) => {
      return new MainBufferedIpc(bugReporter.captureException)
    }
  )

  container.factory(
    'mainCommunication',
    ['mainIpc'],
    (ipc) => {
      const messageBus = new IpcMessageBus(ipc)
      return buildMainCommunication(messageBus)
    }
  )

  container.factory(
    'syncCallbacksInitializer',
    ['environmentCollector', 'frontendLogCache', 'bugReporterMetrics'],
    (environmentCollector, frontendLogCache, bugReporterMetrics) => {
      const receiver = new SyncIpcReceiver()
      const communication = new SyncReceiverMainCommunication(receiver)
      return new SyncCallbacksInitializer(communication, environmentCollector, frontendLogCache, bugReporterMetrics)
    }
  )

  container.factory(
    'communicationBindings',
    ['mainCommunication'],
    (mainCommunication) => {
      return new CommunicationBindings(mainCommunication)
    }
  )
}

export default bootstrap
