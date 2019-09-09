<template>
    <div id="teacherTitle">
        <h1 class="teacher-title">{{ title }}</h1>
    </div>
</template>

<script>
export default {
    name: "TeacherTitle",
    props: ['title']
}
</script>

<style>
#teacherTitle {
    margin-bottom: 40px;
}
</style>
