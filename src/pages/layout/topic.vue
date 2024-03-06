<script setup lang="ts">
const isRefresh = ref(false)
const date = ref<any>(new Date())
function handleRefresh() {
  isRefresh.value = false
}
const loading = ref(false)
const finished = ref(false)
const list = ref([1, 2, 3])
const floating = ref(false)
function load() {
  setTimeout(() => {
    loading.value = false
    finished.value = true
  }, 1000)
}
</script>
<template>
  <div class="topic">
    <var-pull-refresh v-model="isRefresh" @refresh="handleRefresh">
      <app-header>
        <template #left>
          <app-side-menu />
        </template>
        <template #right>
          <app-locale-switch />
          <app-theme-switch />
        </template>
      </app-header>
      <var-date-picker v-model="date" />
      <var-list :finished="finished" v-model:loading="loading" @load="load">
        <var-space class="room-list" direction="column" size="large" justify="center" floating>
          <var-card
            class="card"
            v-for="item in list"
            :key="item"
            outline
            :floating-duration="650"
            v-model:floating="floating"
          >
            <template #title>
      
              <text style="font-weight: bolder; font-size: x-large"> 2212 </text>

            </template>
            <template #description>
              <var-divider dashed />
              <var-space justify="space-between">
                <var-space direction="column">
                  <var-space>
                    <var-button size="mini">空调</var-button>
                    <var-button size="mini">一体机</var-button>
                    <var-button size="mini">监控</var-button>
                  </var-space>
                  <var-space>
                    <var-icon name="account-circle" />
                    <text style="font-size: small">容量：{{item}}人</text>
                  </var-space>
                </var-space>
               <var-tooltip v-if="item==1">
                <var-button type="primary" @click="floating = true">预约</var-button>
               </var-tooltip>
               <var-tooltip v-else-if="item==2" content="该会议室需要审核">
                <var-button class="check-button" type="primary" @click="floating = true"  style="padding-right: 3.4px;">
                  <template #default>
                    预约
                    <var-icon name="information-outline" size="12"/>
                  </template>
                </var-button>  
               </var-tooltip> 
               <var-tooltip v-else-if="item==3" content="没有预约权限">
                <var-button  disabled type="primary" @click="floating = true">预约</var-button>
               </var-tooltip>
              </var-space>
            </template>
            <template #extra> </template>
            <template #floating-content>
              <var-divider dashed />
              <div class="card-example-text">
                <time-grid />
              </div>
            </template>
          </var-card>
        </var-space>
      </var-list>
    </var-pull-refresh>
  </div>

  <router-stack-view />
</template>

<style lang="less" scoped>
.topic {
  padding: calc(var(--app-bar-height)) 0 0;
  --date-picker-border-radius: 0;
  --card-padding: 5px;
  --card-footer-margin: 0;
  --card-title-margin: 0;
  --badge-icon-size:8px;
  &-item {
    display: flex;
    align-items: center;

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      margin-right: 15px;
    }

    &-active {
      color: var(--color-primary);
    }

    &-child {
      padding: 0 7px;
    }
  }
}
.room-list {
  padding: 0 10px;
}
.var-badge--default{
  height: 10px !important;
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
          name: 'sign-up'
        },
        {
          name: 'settings'
        }
      ]
    }
  }
</route>
