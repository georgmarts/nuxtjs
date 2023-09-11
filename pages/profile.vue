<template>
    <main v-show="session?.user">
      <ProfileLoading v-if="!user"/>
      <ProfileFormVeeZod v-else/>  
    </main>
</template>
<script setup lang="ts">
  const {data: session} = useAuth()
  const { user } = useGetUser(session.value?.user.id)
  onMounted(() => {
    if(!session.value?.user) {
      navigateTo('/')
    }
  })
</script>
<style lang="">
    
</style>