import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import IcibaMain from '~/components/IcibaMain/IcibaMain.vue'
import IcibaCircle from '~/components/IcibaCircle/IcibaCircle.vue'
import SizeHelper from '~/components/SizeHelper/SizeHelper.vue'
import SettingPage from '~/components/SettingPage/SettingPage.vue'

import GoogleDictModal from '~/provider/GoogleDict/container/GoogleDictModal.vue'
import GoogleDictModalClass from '~/provider/GoogleDict/container/GoogleDictModal'

import globalBus, { ClickTranslatePayload } from '~/bus/bus'

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
  public $refs!: {
    googleDictModal: GoogleDictModalClass
  }

  public icibaMainFirstLoaded = false
  public settingPageFirstLoaded = false
  public googleDictModalFirstLoaded = false

  public mounted() {
    globalBus.on(globalBus.events.SETTING_PREPARE_OPEN, this.openSettingPage)
    globalBus.on(globalBus.events.ICIBA_MAIN_PREPARE_TRANSLATE, this.openIcibaMain)
    globalBus.on(globalBus.events.GOOGLE_DICT_MODAL_PREPARE_OPEN, this.openGoogleDictModal)
  }

  public destroyed() {
    globalBus.removeListener(globalBus.events.SETTING_PREPARE_OPEN, this.openSettingPage)
    globalBus.removeListener(globalBus.events.ICIBA_MAIN_PREPARE_TRANSLATE, this.openIcibaMain)
    globalBus.removeListener(globalBus.events.GOOGLE_DICT_MODAL_PREPARE_OPEN, this.openGoogleDictModal)
  }

  public getGoogleDictModal() {
    return this.$refs.googleDictModal
  }

  /** 查词窗口懒加载 */
  private async openIcibaMain(payload: ClickTranslatePayload) {
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

  private async openGoogleDictModal({ googleDictData }: { googleDictData: any }) {
    if (!this.googleDictModalFirstLoaded) {
      this.googleDictModalFirstLoaded = true
      // wait for element to be mounted
      await new Promise<void>(rs => this.$nextTick(() => rs()))
    }
    // wait for element to be mounted
    this.$nextTick(() => {
      globalBus.emit(globalBus.events.GOOGLE_DICT_MODAL_OPEN, { googleDictData })
    })
  }
}
