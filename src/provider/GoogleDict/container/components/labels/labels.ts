import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'GoogleDictContainerLabels',
})
export default class extends Vue {
  @Prop([Array])
  public labels!: Array<string>
  @Prop({ default: 'default' })
  public type!: string

  public get labelClass() {
    return `${this.type}-label`
  }
}
