<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const active = ref()

const tabs = ref([
  {
    label: '首页',
    icon: 'home',
    name: '/layout/home'
  },
  {
    label: '时间预约',
    icon: 'calendar-month',
    name: '/layout/topic'
  },
  {
    label: '地点预约',
    icon: 'map-marker-radius-outline',
    name: '/layout/message'
  },
  {
    label: '我的',
    icon: 'account-circle',
    name: '/layout/profile'
  }
])

watch(
  () => route.path,
  (newValue) => {
    active.value = newValue
  },
  { immediate: true }
)

function to(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="layout">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <var-bottom-navigation border safe-area fixed v-model:active="active">
      <var-bottom-navigation-item
        v-for="item in tabs"
        :key="item.label"
        :label="$t(item.label)"
        :icon="item.icon"
        :name="item.name"
        @click="() => to(item.name)"
      />
    </var-bottom-navigation>
  </div>
</template>

<style lang="less" scoped>
.layout {
  padding-bottom: 51px;
  overflow-y: auto;
  height: var(--app-height);
}
</style>
