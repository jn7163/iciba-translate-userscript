import * as EventEmitter from 'events'

enum NAMES {
  PLAY_AUDIO = 'PLAY_AUDIO',
  NYM_CLICK = 'NYM_CLICK',
  ENTRY_CLICK = 'ENTRY_CLICK',
}

interface EventHandler<T> {
  (p: T): void
}

// tslint:disable:unified-signatures
class GoogleDictBus extends EventEmitter {
  public events = NAMES

  public on(e: NAMES.PLAY_AUDIO, h: EventHandler<string>): this
  public on(e: NAMES.NYM_CLICK, h: EventHandler<{ word: string, event: MouseEvent }>): this
  public on(e: NAMES.ENTRY_CLICK, h: EventHandler<{ word: string, event: MouseEvent }>): this
  public on(event: string, listener: (...args: Array<any>) => void) {
    return super.on(event, listener)
  }

  public emit(e: NAMES.PLAY_AUDIO, p: string): boolean
  public emit(e: NAMES.NYM_CLICK, p: { word: string, event: MouseEvent }): boolean
  public emit(e: NAMES.ENTRY_CLICK, p: { word: string, event: MouseEvent }): boolean
  public emit(event: string, payload: any) {
    return super.emit(event, payload)
  }
}

const bus = new GoogleDictBus()
bus.setMaxListeners(0)
export default bus
