export default {
  nitro: {
    
  },
  modules: [
        '@pinia/nuxt',
        '@sidebase/nuxt-auth',
        '@nuxtjs/supabase',
    ],
    auth: {
        origin: process.env.AUTH_ORIGIN
    },
    supabase: {
       url: process.env.SUPABASE_URL,
       key: process.env.SUPABASE_KEY,
       redirect: false,
       redirectOptions: {
            login: '/login',
            callback: '/confirm',
            exclude: [],
       }
    },
    css: ['~/assets/scss/main.scss']
};
