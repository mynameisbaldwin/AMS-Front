<template>
    <div class="sessions">
        <NavSide />
        <div class="teacher-wrapper">
            <h1 class="teacher-head">Today's Sessions</h1>
        </div>
    </div>
</template>

<script>
import NavSide from '../../components/NavSide.vue';
export default {
    name:"sessions",
    components: {
        NavSide
    }
}
</script>

<style>

</style>
