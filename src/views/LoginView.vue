<template>
  <div id="login-view" class="flex flex-col space-y-5">
    <h1 class="text-4xl font-bold">Login</h1>
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto">
      <form action="">
        <legend class="fieldset-legend">Login</legend>
        <div id="error-div">
          <p class="text-error">{{ errorMsg }}</p>
        </div>
        <label class="label">Username</label>
        <input ref="usInput" v-model="us" type="text" class="input" placeholder="Username" />
        <label class="label">Password</label>
        <input v-model="pass" type="password" class="input" placeholder="Password" />
        <button @click.prevent="login" class="btn btn-neutral mt-4">Login</button>
      </form>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { useConfigStore } from '@/stores/config'
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { ref, useTemplateRef } from 'vue'

const configStore = useConfigStore()
const url = configStore.envConfig.serverBase + "/auth/login"

const authStore = useAuthStore()
const { authTokens, isLogged } = storeToRefs(authStore)

const us = ref<string>("")
const pass = ref<string>("")
const errorMsg = ref<string>("")
const usInput = useTemplateRef("usInput")

const login = () => {
  axios.post(url, {
    username: us.value,
    password: pass.value,
  }, {
    headers: {
      'Content-Type': "application/x-www-form-urlencoded"
    }
  })
    .then(res => {
      authTokens.value.token = res.data.access_token
      authTokens.value.refreshToken = res.data.refresh_token
      isLogged.value = true
      errorMsg.value = ""
      router.replace({ name: 'home' })
    })
    .catch(err => {
      errorMsg.value = err.response.data.error
      pass.value = ""
      switch (err.status) {
        case 404:
          us.value = ""
          usInput.value?.focus()
      }
    })
}

</script>
