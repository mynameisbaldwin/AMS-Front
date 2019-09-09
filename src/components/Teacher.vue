<template>
    <div id="teacher-view">
        <NavSide />
        <div class="teacher-wrapper">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import NavSide from "./NavSide.vue";
export default {
    name: "Teacher",
    components: {
        NavSide
    }
}
</script>

<style>
#teacher-view {
    margin-bottom: 40px;
}
</style>
