<template>
        <v-app-bar
      app
      color="#ffdf18"
      dark
    >
    
    <h2><span style="color: black;">Flickpick</span></h2>
    </v-app-bar>
</template>

<script>
export default {
    name: "menu",
    data: () => ({

        images: {
            logo: require('../assets/popcorn.svg'),
            name: require('../assets/moviewreck.png')
        }
    })
}
</script>
