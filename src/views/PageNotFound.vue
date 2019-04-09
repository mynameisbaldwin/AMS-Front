<template>
    <div id="error-404">
        <div id="error-message">
            <h1 id="error-title">Error 404: Page Not Found</h1>
            <b-button id="btn-back" variant="primary" to="/">Back to home</b-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "PageNotFound",
    components: {}
}
</script>

<style>
#error-404 {
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

#error-title {
    margin-bottom: 40px;
}

#btn-back {
    font-weight: bold;
    font-size: 12pt;
}

</style>
