<template>
    <b-container fluid class="login-wrapper">
        <b-row align-v="center" align-h="center">
            <div id="login-title">
                Safety Net
            </div>
        </b-row>
        <b-row align-v="center" align-h="center">
                <div id="login-module">
                </div>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: "signup",
    components: {}
}
</script>

<style>

    #login-title {
        background-color: white;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 75px;
        padding-right: 75px;
        font-size: 2.1em;
        font-family: "Open Sans", "Roboto", "sans serif";
        font-weight: bold;
        letter-spacing: 2px;
        border-radius: 5px;
    }

    #login-module {
        width: 512px;
        height: 580px;
        background-color: white;
        margin-top: 40px;
        border-radius: 10px;
    }

</style>
