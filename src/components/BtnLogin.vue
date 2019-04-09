<!-- 
Small component for login and sign up pages.
Changes button title based on prop passed to it
-->
<template>
  <b-button block type="submit" variant="primary">{{ title }}</b-button>
</template>

<script>
export default {
  name: "BtnLogin",
  props: ["title"]
};
</script>

<style>
</style>
