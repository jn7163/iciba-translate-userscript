<template>
  <div class="flex-col items-start">
    <provider-common
      :icon.sync="form.icon"
      :display.sync="form.display"
      :enable-hotkey.sync="form.enableHotkey"
      :hotkey.sync="form.hotkey"
      name="google翻译"
      :icons="iconOptions"
    />

    <i-radio-group
      class="mt-4"
      v-model="form.translateHost"
    >
      <i-radio
        v-for="n of hostOptions"
        :key="n.key"
        :label="n.label"
        :value="n.key"
      />
    </i-radio-group>

    <p class="text-14 text-grey-400 mt-1 mb-0">
      google翻译接口域名。
      <br>
      translate.google.cn 在国内大部分区域可直接访问
    </p>

    <div class="flex mt-4 pt-1">
      <div class="flex-col items-start flex-grow-0 pr-5">
        <div class="text-grey-600 pr-4 mb-2">语言</div>
        <div
          class="language-option text-16 text-grey-600 mb-2"
          v-for="n of languageOptions"
          :key="n.key"
        >
          {{ n.text }}
        </div>
      </div>
      <div class="flex-col items-center flex-grow-0">
        <div class="text-grey-600 pr-4 mb-1">首选语言</div>
        <i-radio-group
          class="mt-0 flex-grow-0"
          v-model="form.targetLanguage"
        >
          <i-radio
            v-for="n of languageOptions"
            :key="n.key"
            label=""
            :value="n.key"
          />
        </i-radio-group>
      </div>
      <div class="flex-col items-center flex-grow-0">
        <div class="text-grey-600 pr-4 mb-1">备选语言</div>
        <i-radio-group
          class="mt-0"
          v-model="form.secondTargetLanguage"
        >
          <i-radio
            v-for="n of languageOptions"
            :key="n.key"
            label=""
            :value="n.key"
          />
        </i-radio-group>
      </div>
    </div>
    <p
      v-if="form.targetLanguage === form.secondTargetLanguage"
      class="text-14 text-red-500 mt-2 mb-0"
    >
      首选语言和备选语言请选择不同的选项
    </p>
    <p class="text-14 text-grey-400 mt-1 mb-0">
      首选语言：默认翻译到的语言
      <br>
      备选语言：当检测到翻译文本语言为首选语言时，翻译到备选语言
    </p>

    <p class="text-14 text-grey-400 mt-4 mb-0">
      ps：当出现 response with status code 503 时，有可能是触发了验证码。请手动打开google翻译点击验证码。
    </p>
  </div>
</template>

<script lang="ts" src="./googleTranslate.ts"></script>
