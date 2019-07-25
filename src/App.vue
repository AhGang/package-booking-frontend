<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">System</router-link> |
      <router-link to="/about">Client</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "./assets/css/styles.css"
</style>
