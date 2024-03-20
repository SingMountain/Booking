
<script setup lang="ts">
import { ref } from 'vue'
import QrcodeVue, { Level, RenderAs } from 'qrcode.vue'
import { useGlobalStore } from '@/store';
const active = ref('card')
const isRefresh = ref(false)
const value = ref<any>('https://example.com')
const level = ref<Level>('M')
const renderAs = ref<RenderAs>('svg')
const size = ref(200)
const loading = ref(false)
const finished = ref(false)
const ListById = ref({})
const timeReg=/(?<=-)\d{2}-\d{2}/g
const dateReg=/\d{2}:\d{2}/g
const store=useGlobalStore()
const {studentID,URL} = store

const url = `${URL}/getListById?organizerId=${studentID}`

async function handleRefresh() {
  isRefresh.value = false;
  ListById.value = (await (await fetch(url)).json()).data;
  console.log(ListById)
}
function load() {
  loading.value = false;
  finished.value = true;
  };

    // dateList.push(obj.startTime.match(/(?<=-)\d{2}-\d{2}/g));
    // timeList.push(obj.startTime.match(/\d{2}:\d{2}/g));   


onMounted(async ()=>{
  ListById.value = (await (await fetch(url)).json()).data;
})
</script>

<template>
  <div class="home">
    <app-header>.0.
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
            <var-space direction="column" v-for="(item, index) in ListById" :key="index">
              <div style="display: flex; align-items: center">
                <div style="flex: 1">
                  <div style="font-size: small">{{ item.startTime.match(timeReg)[0] }}</div>
                  <div style="font-size: x-large">{{item.startTime.match(dateReg)[0] }}</div>
                </div>
                <div style="flex: 1; align-items: flex-start">
                  <VarImage src="../../../public/分割.png" width="10px" />
                </div>
                <div style="flex: 4">
                  <div style="font-size: large">{{ item.title }}</div>
                  <div style="font-size: small; text-align: right">
                    <var-icon name="map-marker-radius-outline" />
                    {{ item.locationName }}
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
