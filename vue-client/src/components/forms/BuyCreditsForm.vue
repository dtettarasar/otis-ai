<template>

    <div>

        <form @submit.prevent="submitForm" method="post" >

            <label class="form-label" for="quantity">Quantity (between 1 and 20):</label>

            <input class="form-control mb-2" v-model.number="creditQuantity" type="number" id="quantity" name="quantity" min="1" max="20">

            <button class="btn btn-primary" type="submit">Buy</button>

        </form>

    </div>

</template>

<script>

    import axios from 'axios';
    import Cookies from 'js-cookie';

    export default {

        name: 'BuyCreditsForm',

        data() {

            return {

                creditQuantity: 0,

            }

        },

        computed: {
            addCreditsBackEndUrl() {
                return this.$backendUrl + 'front-api/user-add-credits';
            },
            accessToken() {
                return Cookies.get('accessToken');
            }
        },

        methods: {

            async submitForm() {

                console.log('init form submission');
                console.log(this.creditQuantity);
                console.log(this.addCreditsBackEndUrl);

                try {

                    const response = await axios.post(this.addCreditsBackEndUrl, {
                        creditQuantity: this.creditQuantity,
                        accessToken: this.accessToken
                    });

                    console.log("response data:")
                    console.log(response.data);


                } catch (err) {

                    console.error(err);

                }

            }

        }

    }

</script>