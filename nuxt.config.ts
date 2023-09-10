export default {
  nitro: {
    
  },
  modules: [
        '@pinia/nuxt',
        '@sidebase/nuxt-auth',
        '@nuxtjs/supabase',
    ],
    auth: {
        origin: process.env.NUXT_AUTH_ORIGIN
    },
    supabase: {
       url: process.env.NUXT_SUPABASE_URL,
       key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzbWxwbWZ1bnZkZ3Z2b2FuaGRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQyMzc0MzksImV4cCI6MTk5OTgxMzQzOX0.i2Bn_RREm89pe-JXxj6ODl0_bi4bVTkfxFVwGTSYu0g',
       redirect: false,
       redirectOptions: {
            login: '/login',
            callback: '/confirm',
            exclude: [],
       }
    },
    css: ['~/assets/scss/main.scss']
};
