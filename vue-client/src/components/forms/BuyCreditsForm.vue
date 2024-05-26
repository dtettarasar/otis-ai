<template>

    <div>

        <form @submit.prevent="submitForm" method="post" >

            <label class="form-label" for="quantity">Quantity (between 1 and 20):</label>

            <input class="form-control mb-2" v-model.number="creditQuantity" type="number" id="quantity" name="quantity" min="1" max="20">

            <button v-if="!hideSubmitBtn" class="btn btn-primary" type="submit">Buy</button>

            <div v-if="showError" class="alert mt-3 alert-danger" role="alert">
                <i class="bi bi-exclamation-circle"></i> <strong>An unknown error has occured.</strong>
                Your request could not be completed because of an error. Please try again later.
            </div>

            <div v-if="showInfo" class="alert mt-3 alert-info" role="alert">
                <i class="bi bi-info-circle"></i> You'll be redirected to the payment page, it might take a few seconds. 
                <strong>Please do not refresh the page or click the "Back" or "Close" button of your browser.</strong>
            </div>

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
                showError: false,
                showInfo: false,
                hideSubmitBtn: false

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

                    if (response.data.checkoutSessionUrl) {

                        this.showInfo = true;
                        this.hideSubmitBtn = true;
                        this.showError = false;

                        setTimeout(()=> {
                            window.location.href = response.data.checkoutSessionUrl;
                        }, 5000);

                    } else {

                        this.showError = true;
                        this.showInfo = false;

                    }


                } catch (err) {

                    console.error(err);

                }

            }

        }

    }

</script>