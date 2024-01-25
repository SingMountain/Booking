<script setup lang="ts">
import { ref } from 'vue'
import QrcodeVue, { Level, RenderAs } from 'qrcode.vue'
const active = ref('card')
const isRefresh = ref(false)
const value = ref<any>('https://example.com')
const level = ref<Level>('M')
const renderAs = ref<RenderAs>('svg')
const size = ref(200)
const loading = ref(false)
const finished = ref(false)
const list = ref(['8.13', '5.2', '3.18'])
function handleRefresh() {
  isRefresh.value = false
}
function load() {
  setTimeout(() => {
    loading.value = false
    finished.value = true
  }, 1000)
}
</script>

<template>
  <div class="home">
    <app-header>
      <template #left>
        <app-side-menu />
      </template>
      <template #right>
        <app-locale-switch />
        <app-theme-switch />
      </template>
      <template #content>
        <var-tabs color="transparent" active-color="#fff" inactive-color="#ddd" v-model:active="active">
          <var-tab name="card">{{ $t('QR') }}</var-tab>
          <var-tab name="plainCard">{{ $t('会议通知') }}</var-tab>
        </var-tabs>
      </template>
    </app-header>

    <var-pull-refresh v-model="isRefresh" @refresh="handleRefresh">
      <var-tabs-items v-model:active="active">
        <var-tab-item class="home-tab-item" name="card">
          <var-space
            class="home-tab-item-space"
            direction="column"
            size="large"
            align="center"
            style="background-color: --app-title-colo"
          >
            <qrcode-vue :value="value" :level="level" :render-as="renderAs" :size="size" :margin="5" />
          </var-space>
          <var-list :finished="finished" v-model:loading="loading" @load="load">
            <var-space direction="column" v-for="(item, index) in list" :key="index">
              <div style="display: flex; align-items: center">
                <div style="flex: 1">
                  <div style="font-size: x-large">{{ item }}</div>
                  <div style="font-size: small">9:13</div>
                </div>
                <div style="flex: 1; align-items: flex-start">
                  <VarImage src="../../../public/分割.png" width="10px" />
                </div>
                <div style="flex: 4">
                  <div style="font-size: large">日常组会</div>
                  <div style="font-size: small; text-align: right">
                    <var-icon name="map-marker-radius-outline" />
                    2212
                  </div>
                </div>
              </div>
            </var-space>
          </var-list>
        </var-tab-item>
        <var-tab-item class="home-tab-item" name="plainCard"> </var-tab-item>
      </var-tabs-items>
    </var-pull-refresh>
  </div>

  <router-stack-view />
</template>

<style lang="less" scoped>
:root {
  --divider-color: rgba(0, 0, 0, 0.6);
}
.home {
  --home-header-height: 98px;
  padding: calc(var(--home-header-height) + 16px) 14px 16px;

  &-tab-item {
    min-height: calc(var(--app-height) - 190px);
  }

  &-tab-item-space {
    padding: 4px;
  }
}
</style>

<route>
  {
    meta: {
      stacks: [
        {
          name: 'sign-in',
          children: [
            {
              name: 'sign-up'
            },
            {
              name: 'forgot-password'
            }
          ]
        },
        {
          name: 'detail'
        },
        {
          name: 'sign-up'
        },
        {
          name: 'settings'
        }
      ]
    }
  }
</route>
