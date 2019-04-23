<template>
    <b-container fluid>
        <div id="success-block">
            <div id="success-message">
                <h1>Sign Up Success!</h1>
                <h2>You will be redirected to login in 3 seconds....</h2>
            </div>
        </div>
    </b-container>
</template>

<script>
export default {
    name: "SignUpSuccess",
    created() {
        delete localStorage.signUp;
        setTimeout(() => this.$router.push({ path: '/login'}), 3000);
    }
}
</script>

<style scoped>

#success-block {
    background-color: #ededed;
    width: 100%;
    height: 60vh;
    display: flex;
    align-items:center;
    justify-content: center;
}

h1 {
    font-size: 80pt;
    font-family: "Roboto", "sans-serif";
}

h2 {
    font-style: italic;
    font-size: 20pt;
    font-family: "Roboto", "sans-serif";
}
</style>
