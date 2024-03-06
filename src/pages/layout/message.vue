<script setup lang="ts">
const isRefresh = ref(false)
function handleRefresh() {
  isRefresh.value = false
}
async function picker() {
  const { state, texts, indexes } = await Picker({
    cascade: true,
    columns: [
      {
        text: '八号楼',
        children: [
          {
            text: '2212',
            
          },
        ],
      },
      {
        text: '九号楼',
        children: [
          {
            text: '222',
            
          },
        ],
      },
    ],
    onChange(values, indexes) {
      //Snackbar(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
    },
  })
}
</script>

<template>
  <div class="message">
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

      <var-button type="primary"  block @click="picker">
        <template #default>
          <var-button type="primary" outline style="border-color: rgba(199, 198, 198, 0.377);">
            选择会议室
          </var-button>
        </template>
      
      </var-button>

    </var-pull-refresh>
    <time-grid />


  </div>

  <router-stack-view />
</template>

<style lang="less" scoped>
.message {
  padding: calc(var(--app-bar-height)) 0 0;
}
.var-button{
  border-radius: 0;
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
