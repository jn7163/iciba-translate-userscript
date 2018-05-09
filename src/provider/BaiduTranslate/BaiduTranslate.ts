import Vue from 'vue'

import iconBase64 from '~/src/assets/img/providerIcon/baiduTranslate/baidu.svg'
// import { got } from '~/src/lib/gmapi'

import AbstractTranslateProvider from '../AbstractTranslateProvider'

// import icibaContainer from './container/icibaContainer.vue'

class BaiduTranslateProvider extends AbstractTranslateProvider {
  public uniqName = 'BaiduTranslate'
  public settingDescriptor = []
  public containerComponentClass = Vue.extend({ name: 'BaiduTranslateContainer' })

  public constructor() {
    super()
    this.icons = [
      iconBase64,
    ]
  }

  public async translate(word: string) {
    return Promise.resolve()
  }
}

export default BaiduTranslateProvider