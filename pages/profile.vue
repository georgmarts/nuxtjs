<template>
    <main v-show="session?.user">
      <ProfileFormVeeZod/>  
    </main>
</template>
<script setup lang="ts">
  const {data: session} = useAuth()
  onMounted(() => {
    if(!session.value?.user) {
      navigateTo('/')
    }
  })
</script>
<style lang="">
    
</style>