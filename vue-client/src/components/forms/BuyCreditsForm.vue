<template>

    <div>

        <form @submit.prevent="submitForm" method="post" >

            <label for="quantity">Quantity (between 1 and 20):</label>
            <input type="number" id="quantity" name="quantity" min="1" max="20">

            <button type="submit">Buy</button>

        </form>

    </div>

</template>

<script>

    export default {

        name: 'BuyCreditsForm',

        data() {

            return {

            }

        },

        methods: {

            async submitForm() {

                console.log('init form submission');

            }

        }

    }

</script>