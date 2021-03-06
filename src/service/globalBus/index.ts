/* eslint-disable max-classes-per-file */
import { EventEmitter } from 'events'
import { PROVIDER } from '~/constants/constant'
import { BaiduTranslateParams } from '~/provider/BaiduTranslate/BaiduTranslate'
import { BingTranslateParams } from '~/provider/BingTranslate/BingTranslate'
import { GoogleTranslateParams } from '~/provider/GoogleTranslate/GoogleTranslate'
import { SougouTranslateParams } from '~/provider/SougouTranslate/SougouTranslate'

export const enum EVENTS {
  TRANSLATE,
  HOTKEY_SHOW,
  HOTKEY_TRANSLATE,
  OPEN_SETTING,
  OPEN_GOOGLE_DICT_MODAL,
  HIDE_CIRCLE,
}

export interface TranslateAction {
  type: EVENTS.TRANSLATE
  word: string
  mouseEvent?: MouseEvent
  param?: {
    provider: PROVIDER.BAIDU_TRANSLATE
    param?: BaiduTranslateParams
  } | {
    provider: PROVIDER.BING_TRANSLATE
    param?: BingTranslateParams
  } | {
    provider: PROVIDER.GOOGLE_TRANSLATE
    param?: GoogleTranslateParams
  } | {
    provider: PROVIDER.GOOGLE_DICT
    param?: undefined
  } | {
    provider: PROVIDER.ICIBA
    param?: undefined
  } | {
    provider: PROVIDER.SOUGOU_TRANSLATE
    param?: SougouTranslateParams
  } | {
    provider: PROVIDER.URBAN_DICTIONARY
    param?: undefined
  } | {
    provider: PROVIDER.VOCABULARY
    param?: undefined
  }
}

export interface OpenSettingAction {
  type: EVENTS.OPEN_SETTING
}

export interface OpenGoogleDictModalAction {
  type: EVENTS.OPEN_GOOGLE_DICT_MODAL
  googleDictData: any
}

export interface HotKeyShowAction {
  type: EVENTS.HOTKEY_SHOW
  mouseEvent: MouseEvent
}

export interface HotKeyTranslateAction {
  type: EVENTS.HOTKEY_TRANSLATE
  mouseEvent: MouseEvent
  word: string
  provider: PROVIDER
}

export interface HideCircleTranslateAction {
  type: EVENTS.HIDE_CIRCLE
}

type Actions = TranslateAction
| OpenSettingAction
| OpenGoogleDictModalAction
| HotKeyShowAction
| HotKeyTranslateAction
| HideCircleTranslateAction

interface OnOff {
  (e: EVENTS.TRANSLATE, l: (a: TranslateAction) => unknown): unknown
  (e: EVENTS.OPEN_SETTING, l: (a: OpenSettingAction) => unknown): unknown
  (e: EVENTS.OPEN_GOOGLE_DICT_MODAL, l: (a: OpenGoogleDictModalAction) => unknown): unknown
  (e: EVENTS.HOTKEY_SHOW, l: (a: HotKeyShowAction) => unknown): unknown
  (e: EVENTS.HOTKEY_TRANSLATE, l: (a: HotKeyTranslateAction) => unknown): unknown
  (e: EVENTS.HIDE_CIRCLE, l: (a: HideCircleTranslateAction) => unknown): unknown
}

class Bus {
  private bus = new EventEmitter()

  public constructor() {
    this.bus.setMaxListeners(0)
  }

  public on: OnOff = (
    event: EVENTS,
    l: (...p: Array<any>) => unknown,
  ) => this.bus.on(`${event}`, l)

  public off: OnOff = (
    event: EVENTS,
    l: (...p: Array<any>) => unknown,
  ) => this.bus.off(`${event}`, l)

  public emit(action: Actions) {
    return this.bus.emit(`${action.type}`, action)
  }
}

export const bus = new Bus()
