<script>

    export default {
        name: 'PageTitle',
        props: {
            txtValue: {
            type: String,
            required: true
            }
        }
    }

</script>
<template>
    <div>
        <h1 id="page-title">{{ txtValue }}</h1>
    </div>
</template>
<style>

</style>