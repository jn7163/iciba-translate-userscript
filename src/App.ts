import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import IcibaMain from '~/src/components/IcibaMain/IcibaMain.vue'
import IcibaCircle from '~/src/components/IcibaCircle/IcibaCircle.vue'
import SizeHelper from '~/src/components/SizeHelper/SizeHelper.vue'
import SettingPage from '~/src/components/SettingPage/SettingPage.vue'

import GoogleDictModal from '~/src/provider/GoogleDict/container/GoogleDictModal.vue'

import globalBus, { IcibaMainTranslatePayload } from '~/src/bus/bus'

@Component({
  name: 'IcibaAppRoot',
  components: {
    IcibaMain,
    IcibaCircle,
    SizeHelper,
    SettingPage,
    GoogleDictModal,
  },
})
export default class extends Vue {
  public icibaMainFirstLoaded = false
  public settingPageFirstLoaded = false
  public googleDictModalFirstLoaded = false

  public googleDictModalVisible = false

  public mounted() {
    globalBus.on(globalBus.events.SETTING_PREPARE_OPEN, this.openSettingPage)
    globalBus.on(globalBus.events.ICIBA_MAIN_PREPARE_TRANSLATE, this.openIcibaMain)
    globalBus.on(globalBus.events.GOOGLE_DICT_MODAL_PREPARE_OPEN, this.openGoogleDictModal)
  }

  /** 查词窗口懒加载 */
  private async openIcibaMain(payload: IcibaMainTranslatePayload) {
    if (!this.icibaMainFirstLoaded) {
      this.icibaMainFirstLoaded = true
      // wait for element to be mounted
      await new Promise<void>(rs => this.$nextTick(() => rs()))
    }
    globalBus.emit(globalBus.events.ICIBA_MAIN_TRANSLATE, payload)
  }

  /** 设置窗口懒加载 */
  private async openSettingPage() {
    if (!this.settingPageFirstLoaded) {
      this.settingPageFirstLoaded = true
      // wait for element to be mounted
      await new Promise<void>(rs => this.$nextTick(() => rs()))
    }
    globalBus.emit(globalBus.events.SETTING_OPEN)
  }

  private async openGoogleDictModal(dicData: any) {
    if (!this.googleDictModalFirstLoaded) {
      this.googleDictModalFirstLoaded = true
      // wait for element to be mounted
      await new Promise<void>(rs => this.$nextTick(() => rs()))
    }
    // wait for element to be mounted
    globalBus.emit(globalBus.events.GOOGLE_DICT_MODAL_OPEN, dicData)
  }
}