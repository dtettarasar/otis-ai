<template>
    
    <div class="m-2 p-5 bg-dark-subtle rounded" >

        <h1>title</h1>

        <p class="fs-5 date-text">creation date: date value </p>
        <p class="fs-5 date-text">last modification date: value </p>

        <div>

            <p class="fs-5 mt-4">keywords:</p>

            <div class="mb-2 d-flex justify-content-start flex-wrap">

            <div class="badge m-1 p-1 bg-primary keyword-bdge d-flex flex-row">
                <p class="fs-6 m-1 align-self-center">keyword</p>
            </div>

            <div class="badge m-1 p-1 bg-primary keyword-bdge d-flex flex-row">
                <p class="fs-6 m-1 align-self-center">keyword</p>
            </div>

            </div>

            <div class="d-flex flex-row flex-wrap">

                <button class="btn btn-dark m-1 p-2"><i class="bi bi-eye-fill"></i> View</button>
                <button class="btn btn-success m-1 p-2"><i class="bi bi-pen-fill"></i> Edit</button>
                <button class="btn btn-danger m-1 p-2"><i class="bi bi-trash-fill"></i> Delete</button>

            </div>

        </div>

    </div>

</template>

<script>

    export default {
        name: 'ArticleCard',
        props: {
            articleId: {
                type: String,
                required: true
            }
        }
    }

</script>

<style>

    .date-text {
        margin-bottom: 0px;
    }

</style>